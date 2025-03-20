'use client';

import { ArrowLeft, Mail, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Deployment } from '@/components/deployment/deployments-dashboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DeploymentDetailsProps {
  params: {
    id: string;
  };
}

export default function DeploymentDetails({ params }: DeploymentDetailsProps) {
  const router = useRouter();
  const [deployment, setDeployment] = useState<Deployment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For this example, we'll fetch from localStorage
    const fetchDeployment = async () => {
      try {
        const storedDeployments = localStorage.getItem('deployments');
        if (storedDeployments) {
          const deployments: Deployment[] = JSON.parse(storedDeployments);
          const found = deployments.find((d) => d.id === params.id);
          if (found) {
            setDeployment(found);
          }
        }
      } catch (error) {
        console.error('Error fetching deployment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployment();
  }, [params.id]);

  const handleBack = () => {
    router.push('/deployments');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
        <div className="text-lg">Loading deployment details...</div>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
        <div className="text-lg">Deployment not found</div>
      </div>
    );
  }

  // Find problematic services for logs section
  const problematicServices = deployment.services.flatMap((service) =>
    service.versions
      .filter((version) => version.color === 'red')
      .map((version) => ({
        serviceName: service.name,
        serviceType: service.type,
        version: version.number,
        color:
          version.color === 'red'
            ? '#ff4f4f'
            : version.color === 'yellow'
            ? '#aab600'
            : version.color === 'green'
            ? '#00b69b'
            : '',
      }))
  );

  return (
    <div className="min-h-screen flex">
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6FA]">
        {/* Main content grid */}
        <div className="p-4 grid grid-cols-12 gap-4">
          {/* Left column - 5/12 */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            {/* Deployment info card */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${deployment.color} flex items-center justify-center text-white text-lg`}
                    >
                      {deployment.letter}
                    </div>
                    <h2 className="text-2xl font-bold text-[#313d4f]">
                      {deployment.name}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#313d4f]"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                {deployment.address && (
                  <div className="text-[#313d4f] ml-[52px]">
                    <p>{deployment.address.street}</p>
                    <p>{deployment.address.suite}</p>
                    <p>{deployment.address.city}</p>
                    <p>{deployment.address.zipCode}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contacts card */}
            {deployment.contacts && deployment.contacts.length > 0 && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#313d4f] mb-2">
                    Contacts
                  </h3>
                  <div className="space-y-2">
                    {deployment.contacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white rounded"
                      >
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-[#979797]">
                            {contact.email}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#313d4f]"
                          onClick={() =>
                            (window.location.href = `mailto:${contact.email}`)
                          }
                        >
                          <Mail className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column - 7/12 */}
          <div className="col-span-12 md:col-span-7 space-y-4">
            {/* Logs section */}
            {problematicServices.length > 0 && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg font-semibold text-[#313d4f]">Logs</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-[#3749a6] text-white hover:bg-[#3749a6]/90"
                  >
                    view
                  </Button>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  {problematicServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="text-[#313d4f]">
                        {service.serviceName} &gt; {service.serviceType}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`bg-[${service.color}] text-white hover:bg-[${service.color}]/90`}
                        >
                          {service.version}
                        </Badge>
                        <div className="w-5 h-5 rounded-full bg-[#ff4f4f] flex items-center justify-center text-white text-xs">
                          !
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance reports */}
            {deployment.compliance && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg font-semibold text-[#313d4f]">
                    Compliance reports
                  </h3>
                  <Link href={`/deployments/${deployment.id}/compliance`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#3749a6] text-white hover:bg-[#3749a6]/90"
                    >
                      view evidence & reports
                    </Button>
                  </Link>
                </div>
                <div className="px-4 pb-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-[#313d4f]">GDPR</div>
                    </div>
                    <div
                      className={`bg-${
                        deployment.compliance.gdpr === 'non-compliant'
                          ? '[#ff4f4f]'
                          : deployment.compliance.gdpr === 'warning'
                          ? '[#aab600]'
                          : '[#00b69b]'
                      }/10 p-3 rounded`}
                    >
                      <div
                        className={`font-medium text-${
                          deployment.compliance.gdpr === 'non-compliant'
                            ? '[#ff4f4f]'
                            : deployment.compliance.gdpr === 'warning'
                            ? '[#aab600]'
                            : '[#00b69b]'
                        }`}
                      >
                        {deployment.compliance.gdpr === 'non-compliant'
                          ? 'Non compliant'
                          : deployment.compliance.gdpr === 'warning'
                          ? 'Warning'
                          : 'Compliant'}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-[#313d4f]">CCPA</div>
                    </div>
                    <div
                      className={`bg-${
                        deployment.compliance.ccpa === 'non-compliant'
                          ? '[#ff4f4f]'
                          : deployment.compliance.ccpa === 'warning'
                          ? '[#aab600]'
                          : '[#00b69b]'
                      }/10 p-3 rounded`}
                    >
                      <div
                        className={`font-medium text-${
                          deployment.compliance.ccpa === 'non-compliant'
                            ? '[#ff4f4f]'
                            : deployment.compliance.ccpa === 'warning'
                            ? '[#aab600]'
                            : '[#00b69b]'
                        }`}
                      >
                        {deployment.compliance.ccpa === 'non-compliant'
                          ? 'Non compliant'
                          : deployment.compliance.ccpa === 'warning'
                          ? 'Warning'
                          : 'Compliant'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Service sections - full width */}
          {deployment.services.map(
            (service, serviceIndex) =>
              service.devices &&
              service.devices.length > 0 && (
                <div key={serviceIndex} className="col-span-12">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#313d4f] mb-2">
                        {service.name}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#e8e8e8] text-[#313d4f]">
                              <th className="text-left p-2 font-medium">
                                names
                              </th>
                              <th className="text-left p-2 font-medium">
                                versions
                              </th>
                              <th className="text-left p-2 font-medium">
                                root hash
                              </th>
                              <th className="text-left p-2 font-medium">
                                last accessed
                              </th>
                              <th className="text-left p-2 font-medium">
                                last heartbeat
                              </th>
                              <th className="text-left p-2 font-medium">
                                group actions
                              </th>
                              <th className="p-2 w-12"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {service.devices.map((device, deviceIndex) => (
                              <tr
                                key={deviceIndex}
                                className="border-b border-[#e0e0e0] text-[#313d4f]"
                              >
                                <td className="p-2">{device.name}</td>
                                <td className="p-2">
                                  <Badge
                                    style={{
                                      backgroundColor: device.versionColor,
                                    }}
                                    className="text-white hover:opacity-90"
                                  >
                                    {device.version}
                                  </Badge>
                                </td>
                                <td className="p-2 font-mono text-sm">
                                  {device.rootHash}
                                </td>
                                <td className="p-2">{device.lastAccessed}</td>
                                <td className="p-2">{device.lastHeartbeat}</td>
                                <td className="p-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-5 w-5" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Actions</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </td>
                                <td className="p-2">
                                  <div className="w-5 h-5 border border-[#3749a6] rounded flex items-center justify-center">
                                    <svg
                                      width="12"
                                      height="10"
                                      viewBox="0 0 12 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 5L4 8L11 1"
                                        stroke="#3749a6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
