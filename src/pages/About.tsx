
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Globe, Code, Database, Link as LinkIcon, Github, Mail } from 'lucide-react';

const About = () => {
  const techStack = [
    { name: 'React', description: 'Frontend framework for building user interfaces', icon: '⚛️' },
    { name: 'Spring Boot', description: 'Backend framework for Java applications', icon: '🍃' },
    { name: 'IPFS', description: 'Decentralized storage for contribution files', icon: '🌐' },
    { name: 'Ethereum', description: 'Blockchain platform for smart contracts and tokens', icon: '💎' },
    { name: 'BERT', description: 'AI model for text analysis and verification', icon: '📝' },
    { name: 'CLIP', description: 'AI model for image understanding and verification', icon: '🖼️' },
    { name: 'Whisper', description: 'AI model for audio transcription and verification', icon: '🎵' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Verification',
      description: 'Advanced machine learning models ensure data quality and authenticity before reward distribution.'
    },
    {
      icon: Zap,
      title: 'Instant Rewards',
      description: 'Verified contributions are immediately rewarded with crypto tokens directly to your wallet.'
    },
    {
      icon: Globe,
      title: 'Decentralized Platform',
      description: 'Built on blockchain technology for transparency, trust, and global accessibility.'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Community-driven development with transparent algorithms and verification processes.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Lead',
      description: 'PhD in Machine Learning, specialized in multi-modal AI verification systems.',
      avatar: '👩‍🔬'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Blockchain Engineer',
      description: 'Expert in smart contract development and decentralized systems architecture.',
      avatar: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager',
      description: 'Former data scientist with expertise in crowdsourcing and platform design.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About LabelVerse</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We're building the future of data labeling through decentralization, 
            AI verification, and fair compensation for global contributors.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To democratize AI development by creating the world's most reliable and 
              transparent data labeling platform, where quality contributions are fairly 
              rewarded and verified by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-800">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                  <CardTitle className="text-lg dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Verification Section */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI Verification Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">Data Submission</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Contributors upload data according to dataset requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">AI Analysis</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Specialized models analyze quality, relevance, and accuracy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">Score & Reward</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">High-quality contributions receive tokens automatically</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Verification Models</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">📝</span>
                    <div>
                      <p className="font-medium dark:text-white">BERT</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Text analysis and natural language understanding</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">🖼️</span>
                    <div>
                      <p className="font-medium dark:text-white">CLIP</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Image understanding and visual content verification</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-2xl">🎵</span>
                    <div>
                      <p className="font-medium dark:text-white">Whisper</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Audio transcription and speech quality assessment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Built with cutting-edge technologies for scalability, security, and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <h3 className="font-semibold text-lg dark:text-white">{tech.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Passionate experts in AI, blockchain, and data science working to revolutionize data labeling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-800 dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{member.avatar}</div>
                  <h3 className="font-semibold text-lg mb-1 dark:text-white">{member.name}</h3>
                  <Badge variant="outline" className="mb-3 border-orange-200 dark:border-orange-700">{member.role}</Badge>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Have questions about LabelVerse? Want to contribute to our open-source project? 
            We'd love to hear from you!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center space-x-2 border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20">
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2 border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20">
              <Mail className="w-4 h-4" />
              <span>contact@labelverse.com</span>
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              LabelVerse is an open-source project. Join our community of contributors 
              building the future of decentralized AI data labeling.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
