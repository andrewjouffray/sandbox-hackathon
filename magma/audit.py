import requests
import functools

class Audit:
    def __init__(self, deploymentType, deploymentName, deploymentVersion, deploymentEnvironment, serviceName):
        self.deploymentType = deploymentType
        self.deploymentName = deploymentName
        self.deploymentVersion = deploymentVersion
        self.deploymentEnvironment = deploymentEnvironment
        self.serviceName = serviceName

    def build_request(self, event_type, metadata):
        """
        Builds an audit request payload including metadata about the data being processed.
        """
        deployment_info = {
            "deploymentType": self.deploymentType,
            "deploymentName": self.deploymentName,
            "deploymentVersion": self.deploymentVersion,
            "deploymentEnvironment": self.deploymentEnvironment,
            "serviceName": self.serviceName,
            "eventType": event_type
        }

        return {
            "deploymentInfo": deployment_info,
            "metadata": metadata  # Data attributes passed via the decorator
        }

    def send_request(self, event_type, metadata):
        """
        Sends the audit log request to an external API.
        """
        request_payload = self.build_request(event_type, metadata)
        print(f"Sending audit log: {request_payload}")
        try:
            response = requests.post("http://localhost:5000/audit", json=request_payload)
            return response.json()
        except requests.RequestException as e:
            print(f"Audit log failed: {e}")
            return {"status": "error", "message": str(e)}

    def audit_event(self, event_type, data_type, encrypted, identifiable, medical, personal):
        """
        Decorator for logging function calls with custom data attributes.
        """
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                result = func(*args, **kwargs)

                # Data attributes for auditing
                metadata = {
                    "data_type": data_type,
                    "encrypted": encrypted,
                    "identifiable": identifiable,
                    "medical": medical,
                    "personal": personal
                }

                # Send audit log
                self.send_request(event_type, metadata)
                return result
            return wrapper
        return decorator

    # Specialized decorators using `audit_event` with required attributes
    def received_data(self, data_type, encrypted, identifiable, medical, personal):
        return self.audit_event("received_data", data_type, encrypted, identifiable, medical, personal)

    def saving_data(self, data_type, encrypted, identifiable, medical, personal):
        return self.audit_event("saving_data", data_type, encrypted, identifiable, medical, personal)

    def sending_data(self, data_type, encrypted, identifiable, medical, personal):
        return self.audit_event("sending_data", data_type, encrypted, identifiable, medical, personal)