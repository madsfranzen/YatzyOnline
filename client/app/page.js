import Navbar from '@/components/ui/Navbar'
import LobbyList from '@/components/ui/LobbyList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<LobbyList/>
			</div>
    </div>
  );
}
