import ComplianceDashboard from '@/components/compliance/compliance-dashboard';

interface ComplianceDashboardPageProps {
  params: { id: string };
}

export default async function ComplianceDashboardPage({
  params,
}: ComplianceDashboardPageProps) {
  const { id } = await params;

  if (!id) {
    return <div>Loading...</div>;
  }

  console.log(id);

  return <ComplianceDashboard deploymentId={id} />;
}
