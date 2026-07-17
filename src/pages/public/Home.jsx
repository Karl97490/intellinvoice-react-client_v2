import { NavLink } from "react-router-dom";
import { Button, Badge } from "flowbite-react";
import {
  FileText,
  DollarSign,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <Badge color="indigo" className="mb-4 p-2 inline-flex">
            Smart Invoice Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage your invoices{" "}
            <span className="text-blue-600">effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create, send and track invoices in seconds. Get paid faster with
            IntelliInvoice — the smart solution for freelancers and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={NavLink} to="/signup" size="xl" className="px-8">
              Get Started Free
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              as={NavLink}
              to="/login"
              size="xl"
              color="light"
              className="px-8"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Invoices Created" },
              { value: "98%", label: "On-time Payments" },
              { value: "2K+", label: "Happy Users" },
              { value: "50+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to get paid
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Powerful features designed to simplify your invoicing workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText size={28} className="text-blue-600" />,
                bg: "bg-blue-50",
                title: "Smart Invoices",
                desc: "Create professional invoices in seconds with automatic calculations for taxes and totals.",
              },
              {
                icon: <Users size={28} className="text-green-600" />,
                bg: "bg-green-50",
                title: "Client Management",
                desc: "Keep all your client information in one place and access it instantly when needed.",
              },
              {
                icon: <BarChart3 size={28} className="text-purple-600" />,
                bg: "bg-purple-50",
                title: "Analytics Dashboard",
                desc: "Track your revenue, outstanding payments and business performance at a glance.",
              },
              {
                icon: <DollarSign size={28} className="text-yellow-600" />,
                bg: "bg-yellow-50",
                title: "Payment Tracking",
                desc: "Monitor paid, unpaid and overdue invoices with real-time status updates.",
              },
              {
                icon: <Zap size={28} className="text-orange-600" />,
                bg: "bg-orange-50",
                title: "PDF Export",
                desc: "Download or print your invoices as PDF with one click, ready to send to clients.",
              },
              {
                icon: <Shield size={28} className="text-red-600" />,
                bg: "bg-red-50",
                title: "Secure & Private",
                desc: "Your financial data is protected with industry-standard encryption and authentication.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get started in 3 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                icon: <Users size={24} className="text-blue-600" />,
                title: "Create your account",
                desc: "Sign up for free and set up your profile in under a minute.",
              },
              {
                step: "02",
                icon: <FileText size={24} className="text-blue-600" />,
                title: "Add clients & invoices",
                desc: "Add your clients and start generating professional invoices.",
              },
              {
                step: "03",
                icon: <Clock size={24} className="text-blue-600" />,
                title: "Track & get paid",
                desc: "Monitor payment status and get notified when invoices are paid.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <span className="text-7xl font-black text-blue-50 select-none">
                    {item.step}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to simplify your invoicing?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of freelancers and businesses who trust
            IntelliInvoice.
          </p>
          <Button
            as={NavLink}
            to="/signup"
            size="xl"
            color="light"
            className="px-10 max-w-60 mx-auto"
          >
            Start for Free
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
