export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm mb-2">Courses Enrolled</h3>
          <p className="text-3xl font-bold text-primary">3</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm mb-2">Courses Completed</h3>
          <p className="text-3xl font-bold text-green-600">1</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm mb-2">Learning Hours</h3>
          <p className="text-3xl font-bold text-accent">24</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gradientStart to-gradientEnd rounded-lg flex items-center justify-center text-white font-bold text-xl">
                W
              </div>
              <div>
                <h3 className="font-semibold">Introduction to Web Development</h3>
                <p className="text-sm text-gray-600">Progress: 60%</p>
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
              Continue
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gradientStart to-gradientEnd rounded-lg flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <div>
                <h3 className="font-semibold">Advanced React Development</h3>
                <p className="text-sm text-gray-600">Progress: 30%</p>
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Completed lesson: CSS Basics</span>
            <span className="text-gray-400 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Started course: Advanced React Development</span>
            <span className="text-gray-400 ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Earned certificate: Introduction to Web Development</span>
            <span className="text-gray-400 ml-auto">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
