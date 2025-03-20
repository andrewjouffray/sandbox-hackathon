import DeploymentDetails from '@/components/deployment/deployment-details';

interface DeploymentDetailsPageProps {
  params: { id: string };
}

export default async function DeploymentDetailsPage({
  params,
}: DeploymentDetailsPageProps) {
  const { id } = await params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <DeploymentDetails params={{ id }} />;
}
