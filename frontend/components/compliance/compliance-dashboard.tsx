'use client';

import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ComplianceDashboardProps {
  deploymentId: string;
}

export default function ComplianceDashboard({
  deploymentId,
}: ComplianceDashboardProps) {
  // Define all compliance regulations
  const [complianceRegulations] = useState<ComplianceRegulation[]>([
    { title: 'GDPR', reports: gdprReports },
    { title: 'CCPA', reports: ccpaReports },
    { title: 'HIPAA', reports: hipaaReports },
    { title: 'SOX', reports: soxReports },
    { title: 'PCI DSS', reports: pciReports },
  ]);

  localStorage.setItem('complianceRegulations', JSON.stringify(complianceRegulations));

  return (
    <div className="min-h-screen flex">
      {/* Main content */}
      <div className="flex-1 bg-[#f5f6fa]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#313d4f]">
              Chicago Office{' '}
              <span className="text-[#979797]">| compliance reports</span>
            </h1>
            <Button variant="ghost" size="icon" className="text-[#313d4f]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <Button className="bg-[#202224] text-white hover:bg-[#202224]/90 mb-8">
            Add new
          </Button>

          <div className="space-y-4">
            {complianceRegulations.map((regulation, index) => (
              <div key={regulation.title}>
                <CollapsibleComplianceSection
                  title={regulation.title}
                  reports={regulation.reports}
                  deploymentId={deploymentId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ComplianceSectionProps {
  title: string;
  reports: Report[];
  className?: string;
  deploymentId: string;
}

function CollapsibleComplianceSection({
  title,
  reports,
  className = '',
  deploymentId,
}: ComplianceSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get the most recent report by sorting the reports by date
  const mostRecentReport = [...reports].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`border border-[#e0e0e0] rounded-lg bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between p-4 bg-[#f8f8f8]">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#313d4f]">{title}</h2>
          {mostRecentReport && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Latest:</span>
              <div className="flex items-center">
                <span className={getStatusClass(mostRecentReport.status)}>
                  {mostRecentReport.status}
                </span>
                {(mostRecentReport.status === 'warning' ||
                  mostRecentReport.status === 'non-compliant') &&
                  mostRecentReport.warningLevel && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="destructive"
                            className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#f93c65] text-white text-xs"
                          >
                            {mostRecentReport.warningLevel}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {mostRecentReport.warningLevel}{' '}
                            {mostRecentReport.warningLevel === 1
                              ? 'issue'
                              : 'issues'}{' '}
                            found
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
              </div>
              <span className="text-xs text-gray-400">
                ({mostRecentReport.date})
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-700"
          >
            View rules
          </Button>
          <Button
            size="sm"
            className="h-7 px-2 text-xs bg-[#202224] text-white hover:bg-[#202224]/90"
          >
            New report
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7 ml-1">
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <Card className="bg-white rounded-none border-0 overflow-hidden p-0">
          <Table className="[&_thead]:bg-[#e8e8e8]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#313d4f] font-medium">
                  report date
                </TableHead>
                <TableHead className="text-[#313d4f] font-medium">
                  deployment hash
                </TableHead>
                <TableHead className="text-[#313d4f] font-medium text-center">
                  entities audited
                </TableHead>
                <TableHead className="text-[#313d4f] font-medium">
                  compliance status
                </TableHead>
                <TableHead className="text-[#313d4f] font-medium">
                  actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={index} className="border-b border-[#e0e0e0]">
                  <TableCell className="text-[#313d4f]">
                    {report.date}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#313d4f]">
                    {report.hash}
                  </TableCell>
                  <TableCell className="text-center text-[#313d4f]">
                    {report.entitiesAudited}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className={getStatusClass(report.status)}>
                        {report.status}
                      </span>
                      {(report.status === 'warning' ||
                        report.status === 'non-compliant') &&
                        report.warningLevel && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge
                                  variant="destructive"
                                  className="ml-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#f93c65] text-white text-xs"
                                >
                                  {report.warningLevel}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {report.warningLevel}{' '}
                                  {report.warningLevel === 1
                                    ? 'issue'
                                    : 'issues'}{' '}
                                  found
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* <Link
                      href={`/deployments/${deploymentId}/complience/report/${report.id}`}
                    > */}
                      <Button
                        variant="secondary"
                        className="bg-[#5c5c5c] text-white hover:bg-[#5c5c5c]/90 h-6 px-4 py-0 rounded-full text-xs"
                      >
                        view report
                      </Button>
                    {/* </Link> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'compliant':
      return 'text-green-500'; // Green for compliant
    case 'non-compliant':
      return 'text-[#f93c65]'; // Red for non-compliant
    case 'warning':
      return 'text-[#aab600]'; // Yellow for warning
    default:
      return '';
  }
}

interface ComplianceRegulation {
  title: string;
  reports: Report[];
}

export interface Report {
  id: number;
  date: string;
  hash: string;
  entitiesAudited: number;
  status: 'compliant' | 'non-compliant' | 'warning';
  warningLevel?: number;
}

const gdprReports: Report[] = [
  {
    id: 1,
    date: 'Feb 26 2025',
    hash: '2f5dec5bc13d3b162ebb46b727dd9af3fc0ea21a',
    entitiesAudited: 6,
    status: 'non-compliant',
    warningLevel: 3, // Adding number of issues
  },
  {
    id: 2,
    date: 'Jan 8 2025',
    hash: 'e7b570a830a146e5f8625382e31f7c5fb009d865',
    entitiesAudited: 5,
    status: 'compliant',
  },
  {
    id: 3,
    date: 'Nov 1 2024',
    hash: 'ca8c39444fa3a4e7a123e69397026d5b074951c0',
    entitiesAudited: 5,
    status: 'compliant',
  },
  {
    id: 4,
    date: 'Sep 28 2024',
    hash: '3718b74b473ea2a9d115acfc39d81349137f41c1',
    entitiesAudited: 5,
    status: 'compliant',
  },
  {
    id: 5,
    date: 'Sep 2 2024',
    hash: '69b0bec21b867e9361a7d6a5ec3e92c59e65eca7',
    entitiesAudited: 3,
    status: 'warning',
    warningLevel: 2, // Adding number of issues
  },
];

const ccpaReports: Report[] = [
  {
    id: 6,
    date: 'Feb 26 2025',
    hash: '2f5dec5bc13d3b162ebb46b727dd9af3fc0ea21a',
    entitiesAudited: 6,
    status: 'warning',
    warningLevel: 1,
  },
  {
    id: 7,
    date: 'Jan 8 2025',
    hash: 'e7b570a830a146e5f8625382e31f7c5fb009d865',
    entitiesAudited: 5,
    status: 'non-compliant',
    warningLevel: 4, // Adding number of issues
  },
  {
    id: 8,
    date: 'Nov 1 2024',
    hash: 'ca8c39444fa3a4e7a123e69397026d5b074951c0',
    entitiesAudited: 5,
    status: 'compliant',
  },
];

// Added more mock data for additional regulations
const hipaaReports: Report[] = [
  {
    id: 9,
    date: 'Mar 15 2025',
    hash: '4a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    entitiesAudited: 8,
    status: 'compliant',
  },
  {
    id: 10,
    date: 'Feb 10 2025',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    entitiesAudited: 8,
    status: 'warning',
    warningLevel: 2,
  },
];

const soxReports: Report[] = [
  {
    id: 11,
    date: 'Mar 10 2025',
    hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
    entitiesAudited: 12,
    status: 'compliant',
  },
  {
    id: 12,
    date: 'Jan 20 2025',
    hash: 'f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0',
    entitiesAudited: 10,
    status: 'non-compliant',
    warningLevel: 5,
  },
];

const pciReports: Report[] = [
  {
    id: 13,
    date: 'Mar 5 2025',
    hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    entitiesAudited: 7,
    status: 'compliant',
  },
];
