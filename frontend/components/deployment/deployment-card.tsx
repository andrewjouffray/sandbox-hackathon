import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ServiceCard from '../service/service-card';
import type { Deployment } from './deployments-dashboard';
import Link from 'next/link';

interface DeploymentCardProps {
  deployment: Deployment;
}

export default function DeploymentCard({ deployment }: DeploymentCardProps) {
  return (
    <Card className="overflow-hidden max-h-96 h-full flex flex-col p-0 w-full">
      {/* Header Section */}
      <div className="bg-[#fef7ff] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`${deployment.color} w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0`}
          >
            {deployment.letter}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">{deployment.name}</div>
            <div className="text-sm text-gray-400 truncate">
              {deployment.status}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 flex-shrink-0 ml-2"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#2A3749] text-white border-gray-700"
          >
            <Link href={`/deployments/${deployment.id}`}>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scrollable Content Area */}
      <ScrollArea className="bg-[#1E2A3B] flex-1 overflow-auto p-0">
        <div className="p-1">
          <ServiceCard deployment={deployment} />
        </div>
      </ScrollArea>
    </Card>
  );
}
