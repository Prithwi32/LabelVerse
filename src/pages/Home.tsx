
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Coins, Users, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'AI-Based Verification',
      description: 'Advanced AI models (BERT, CLIP, Whisper) ensure data quality and accuracy.'
    },
    {
      icon: Coins,
      title: 'Crypto Rewards',
      description: 'Earn tokens for verified contributions. Transparent and immediate payments.'
    },
    {
      icon: Users,
      title: 'Global Collaboration',
      description: 'Join contributors worldwide in building high-quality datasets.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Get instant feedback on your contributions with automated verification.'
    }
  ];

  const stats = [
    { label: 'Active Contributors', value: '2,547', color: 'text-orange-600' },
    { label: 'Datasets Available', value: '127', color: 'text-emerald-600' },
    { label: 'Tokens Distributed', value: '1.2M', color: 'text-purple-600' },
    { label: 'Verification Rate', value: '94%', color: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Data Scientist',
      content: 'LabelVerse has revolutionized how I contribute to AI datasets. The verification process is transparent and the rewards are fair.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'ML Engineer',
      content: 'Finally, a platform that values quality over quantity. The AI verification gives me confidence in the data integrity.',
      avatar: '👨‍🔬'
    },
    {
      name: 'Priya Patel',
      role: 'Voice Artist',
      content: 'Contributing audio data has never been easier. I love earning tokens for my voice recordings!',
      avatar: '🎤'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              LabelVerse
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Quality labels. Transparent rewards.
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Join the decentralized data labeling revolution. Contribute high-quality data, 
              get verified by AI, and earn crypto tokens for your valuable work.
            </p>
            <div className="mb-12 flex justify-center">
              <img 
                src="/img/hero_img.png" 
                alt="LabelVerse Platform Visualization" 
                className="max-w-full h-auto max-h-64 object-contain"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-orange-600 dark:hover:bg-white text-lg px-8 py-3"
              >
                <Link to="/datasets">Explore Datasets</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-emerald-600 bg-white hover:bg-gray-100 hover:text-purple-700 dark:border-gray-200 dark:bg-gray-100 dark:text-purple-600 dark:hover:bg-white dark:hover:text-purple-700 text-lg px-8 py-3"
              >
                <Link to="/dashboard">Connect Wallet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} dark:opacity-90`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose LabelVerse?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI verification with blockchain technology 
              to create the most reliable data labeling ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-700">
                <CardContent className="p-8">
                  <feature.icon className="w-12 h-12 text-red-600 dark:text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Simple steps to start earning tokens for your data contributions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Connect Wallet</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect your MetaMask wallet to the Sepolia testnet and browse available datasets.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Submit Data</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload high-quality data following dataset guidelines and requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Earn Tokens</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI verifies your contribution and you receive tokens directly to your wallet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Contributors Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{testimonial.avatar}</span>
                    <div>
                      <div className="font-semibold dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-500 to-purple-600 dark:from-orange-700 dark:via-red-600 dark:to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of contributors making AI better while earning crypto rewards.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-orange-600 dark:hover:bg-white text-lg px-8 py-3"
          >
            <Link to="/datasets">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
