import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { Wallet, Trophy, FileText, Coins, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Contribution, VerificationStatus } from '@/types';
import { sepolia } from '@/lib/web3-config';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    chainId: sepolia.id,
  });

  // Mock user data
  const userData = {
    totalScore: 8.7,
    totalContributions: 42,
    tokenBalance: 127.5,
    rank: 15
  };

  // Mock contributions data
  const contributions: Contribution[] = [
    {
      id: '1',
      userId: 'user1',
      datasetId: '1',
      url: 'audio-sample-1.wav',
      uploadedAt: '2024-03-15T10:30:00Z',
      verificationScore: 9.2,
      status: VerificationStatus.VERIFIED,
      description: 'Tamil pronunciation sample'
    },
    {
      id: '2',
      userId: 'user1',
      datasetId: '3',
      url: 'text-sample-1.txt',
      uploadedAt: '2024-03-14T14:20:00Z',
      verificationScore: 0,
      status: VerificationStatus.PENDING
    },
    {
      id: '3',
      userId: 'user1',
      datasetId: '5',
      url: 'handwriting-1.png',
      uploadedAt: '2024-03-13T09:15:00Z',
      verificationScore: 6.8,
      status: VerificationStatus.REJECTED,
      description: 'Handwriting sample - too blurry'
    }
  ];

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, username: 'DataMaster', score: 9.8, contributions: 156 },
    { rank: 2, username: 'AIContributor', score: 9.5, contributions: 134 },
    { rank: 3, username: 'VoiceExpert', score: 9.3, contributions: 98 },
    { rank: 4, username: 'CodeWhiz', score: 9.1, contributions: 87 },
    { rank: 5, username: 'ImagePro', score: 8.9, contributions: 76 }
  ];

  const connectWallet = () => {
    const metamaskConnector = connectors.find(connector => connector.name === 'MetaMask');
    if (metamaskConnector) {
      connect({ connector: metamaskConnector });
    }
  };

  const getStatusIcon = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case VerificationStatus.PENDING:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case VerificationStatus.REJECTED:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case VerificationStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case VerificationStatus.REJECTED:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 dark:text-white">
              <Wallet className="w-6 h-6" />
              <span>Connect Your Wallet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Connect your MetaMask wallet to access your dashboard and start earning tokens.
            </p>
            <Button onClick={connectWallet} className="w-full bg-orange-600 hover:bg-orange-700 dark:text-white">
              <Wallet className="w-4 h-4 mr-2" />
              Connect MetaMask
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Make sure you're connected to the Sepolia testnet
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here's your contribution overview and earnings.
          </p>
        </div>

        {/* Wallet Info */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 dark:text-white">
              <Wallet className="w-5 h-5" />
              <span>Wallet Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wallet Address</p>
                <p className="font-mono text-sm dark:text-white">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">ETH Balance</p>
                <p className="font-semibold dark:text-white">
                  {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Network</p>
                <p className="font-semibold dark:text-white">Sepolia Testnet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                <div>
                  <p className="text-2xl font-bold dark:text-white">{userData.totalScore}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Overall Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-2xl font-bold dark:text-white">{userData.totalContributions}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contributions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Coins className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold dark:text-white">{userData.tokenBalance}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tokens Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-2xl font-bold dark:text-white">#{userData.rank}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Global Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="contributions">My Contributions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Recent Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(contribution.status)}
                        <div>
                          <p className="font-semibold dark:text-white">{contribution.url}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(contribution.uploadedAt).toLocaleDateString()}
                          </p>
                          {contribution.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">{contribution.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(contribution.status)}>
                          {contribution.status}
                        </Badge>
                        {contribution.status === VerificationStatus.VERIFIED && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Score: {contribution.verificationScore}/10
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                          <span className="font-bold text-violet-600 dark:text-violet-400">#{user.rank}</span>
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white">{user.username}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.contributions} contributions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg dark:text-white">{user.score}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
