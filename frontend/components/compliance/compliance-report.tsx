'use client';

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
import ComplianceGraph from '@/components/compliance/compliance-graph';

export default function ComplianceReport() {
  const [currentDate] = useState(new Date('2025-02-26'));

  const issues = [
    'Identifiable personal data from Europe saved in U.S Server',
    'Medical data from Europe saved in U.S Server',
    "Medical data from Europe not encrypted on user's device",
  ];

  const suggestions = [
    'Move ingress.myapp.com and db.myapp.com to Europe',
    'Encrypt medical data at rest on the device',
  ];

  const ambiguities = [
    'If possible, indicate where the data received by the iOS myapp (europe) is coming from',
  ];

  const evidenceData = [
    {
      type: 'received',
      location: 'unknown',
      date: '02/23/2025 12:03:12',
      dataType: 'command',
      personal: false,
      medical: false,
      encrypted: true,
    },
    {
      type: 'sent',
      location: 'ingress.myapp.com',
      date: '02/23/2025 12:03:12',
      dataType: 'medical form',
      personal: true,
      medical: true,
      encrypted: true,
    },
    {
      type: 'sent',
      location: 'ingress.myapp.com',
      date: '02/23/2025 12:03:12',
      dataType: 'insurance info',
      personal: true,
      medical: false,
      encrypted: true,
    },
    {
      type: 'saved',
      location: 'on device',
      date: '02/23/2025 12:03:12',
      dataType: 'medical history',
      personal: true,
      medical: true,
      encrypted: false,
    },
  ];

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8">
            Chicago Office | GDPR -{' '}
            {currentDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Graph</h2>
            </div>
            <div className="border border-[#e0e0e0] rounded-md bg-white relative">
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  className="bg-[#273142] text-white hover:bg-[#313d4f]"
                >
                  edit graph
                </Button>
              </div>
              <div className="h-[400px] p-4">
                <ComplianceGraph />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8">
            <div className="bg-[#f93c65]/20 p-6 rounded-md">
              <h2 className="text-2xl font-bold text-[#b60003]">
                Non-compliant
              </h2>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Issues</h2>
              <ul className="space-y-2">
                {issues.map((issue, index) => (
                  <li key={index} className="text-[#313d4f]">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Suggestions</h2>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-[#313d4f]">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Ambiguities</h2>
              <ul className="space-y-2">
                {ambiguities.map((ambiguity, index) => (
                  <li key={index} className="text-[#313d4f]">
                    {ambiguity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Evidence</h2>
            <div>
              <h3 className="text-xl font-semibold mb-2">IOS myapp - europe</h3>
              <div className="flex gap-2 mb-4">
                <Badge className="bg-[#4880ff]">v 0.3</Badge>
                <Badge className="bg-[#4880ff]">v 0.4</Badge>
                <Badge className="bg-[#4880ff]">v 0.5</Badge>
              </div>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#f5f5f5]">
                      <TableHead>evidence type</TableHead>
                      <TableHead>location</TableHead>
                      <TableHead>date received</TableHead>
                      <TableHead>data type</TableHead>
                      <TableHead>personal & identifiable</TableHead>
                      <TableHead>medical</TableHead>
                      <TableHead>encrypted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evidenceData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.dataType}</TableCell>
                        <TableCell>{row.personal ? 'true' : 'false'}</TableCell>
                        <TableCell>{row.medical ? 'true' : 'false'}</TableCell>
                        <TableCell>
                          {row.encrypted ? 'true' : 'false'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
