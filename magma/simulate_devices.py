import multiprocessing
import time
import random

from audit import Audit  

# Initialize Audit instances for each deployment type
audit_receiver_saver = Audit("cloud", "cloud server", "1.0", "prod", "db-api")
audit_receiver_sender = Audit("on-prem", "appliance", "1.0", "prod", "text to speech")
audit_sender = Audit("device", "ZMX-camera", "1.3", "prod", "main")

def generate_random_data():
    """Generate random mock data for testing."""
    return {
        "id": random.randint(1, 1000),
        "value": random.choice(["dataA", "dataB", "dataC"]),
        "timestamp": time.time()
    }

def receiver_saver():
    """Process that receives and saves data."""
    while True:
        data = generate_random_data()
        print(f"[Receiver & Saver] Received data: {data}")

        @audit_receiver_saver.saving_data(
            data_type="camera_feed",
            encrypted=False,
            identifiable=True,
            medical=False,
            personal=True
        )
        def save_data(record):
            print(f"[Receiver & Saver] Saving data: {record}")
            return {"status": "saved"}

        save_data(data)
        time.sleep(random.uniform(1, 3))  # Mimic processing time

def receiver_sender():
    """Process that receives data and forwards it."""
    while True:
        data = generate_random_data()
        print(f"[Receiver & Sender] Received data: {data}")

        @audit_receiver_sender.sending_data(
            data_type="event_logs",
            encrypted=True,
            identifiable=True,
            medical=False,
            personal=True
        )
        def forward_data(record):
            print(f"[Receiver & Sender] Forwarding data: {record}")
            return

        forward_data(data)
        time.sleep(random.uniform(1, 3))  # Mimic processing time

def sender():
    """Process that only sends data."""
    while True:
        data = generate_random_data()
        print(f"[Sender] Sending data: {data}")

        @audit_sender.sending_data(
            data_type="telemetry",
            encrypted=True,
            identifiable=False,
            medical=False,
            personal=False
        )
        def send_data(record):
            print(f"[Sender] Sending telemetry data: {record}")
            return

        send_data(data)
        time.sleep(random.uniform(1, 3))  # Mimic processing time

if __name__ == "__main__":
    # Create and start processes
    processes = [
        multiprocessing.Process(target=receiver_saver),
        multiprocessing.Process(target=receiver_sender),
        multiprocessing.Process(target=sender)
    ]

    for process in processes:
        process.start()

    for process in processes:
        process.join()  # Keep the processes running
