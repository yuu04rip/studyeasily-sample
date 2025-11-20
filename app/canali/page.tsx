export default function CanaliPage() {
  const channels = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant support from our team during business hours',
      availability: 'Mon-Fri, 9AM-6PM EST',
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us your questions and we\'ll respond within 24 hours',
      contact: 'support@studyeasily.com',
    },
    {
      icon: '📱',
      title: 'Social Media',
      description: 'Follow us for updates, tips, and community discussions',
      platforms: ['Twitter', 'LinkedIn', 'Facebook'],
    },
    {
      icon: '💡',
      title: 'Community Forum',
      description: 'Connect with other learners and share knowledge',
      link: '/community',
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'For enterprise customers, we offer dedicated phone support',
      availability: 'By appointment',
    },
    {
      icon: '📚',
      title: 'Knowledge Base',
      description: 'Browse articles and guides for self-service support',
      link: '/help',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Channels</h1>
        <p className="text-xl text-gray-600">
          We're here to help! Choose the best way to reach us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">{channel.icon}</div>
            <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
            <p className="text-gray-600 mb-4">{channel.description}</p>
            {channel.availability && (
              <p className="text-sm text-gray-500">
                <strong>Available:</strong> {channel.availability}
              </p>
            )}
            {channel.contact && (
              <p className="text-sm text-primary font-medium">{channel.contact}</p>
            )}
            {channel.platforms && (
              <div className="flex space-x-2 mt-2">
                {channel.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            )}
            {channel.link && (
              <a href={channel.link} className="text-primary hover:underline text-sm">
                Learn more →
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-gradientStart to-gradientEnd text-white rounded-lg p-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
        <p className="text-xl mb-6 text-white/90">
          Our support team is standing by to assist you
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Start Live Chat
        </button>
      </div>
    </div>
  );
}
