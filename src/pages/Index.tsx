import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  Star,
  Building,
  Zap,
  Shield,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-dark">
      {/* Navigation */}
      <nav className="border-b border-dashboard-sidebar bg-dashboard-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-dashboard-accent-teal rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-dashboard-dark" />
                </div>
                <span className="text-xl font-bold text-dashboard-text-primary">
                  CRMPro
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-dashboard-text-muted hover:text-dashboard-text-primary font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-dashboard-text-muted hover:text-dashboard-text-primary font-medium transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-dashboard-text-muted hover:text-dashboard-text-primary font-medium transition-colors"
              >
                About
              </a>
              <Button
                size="sm"
                className="bg-dashboard-accent-teal text-dashboard-dark hover:!bg-dashboard-accent-teal/80"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-dashboard-accent-teal text-dashboard-dark hover:!bg-dashboard-accent-teal/80"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-[50px] bg-gradient-to-b from-dashboard-dark to-dashboard-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-dashboard-accent-orange/20 text-dashboard-accent-orange hover:bg-dashboard-accent-orange/30 border-dashboard-accent-orange">
              <Star className="w-3 h-3 mr-1" />
              #1 CRM for Growing Businesses
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-dashboard-text-primary mb-6">
              Grow Your Business with
              <span className="text-dashboard-accent-teal block">
                Smart CRM Solutions
              </span>
            </h1>
            <p className="text-xl text-dashboard-text-muted mb-8 max-w-3xl mx-auto">
              Streamline your sales process, nurture customer relationships, and
              boost revenue with our all-in-one CRM platform trusted by 10,000+
              businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-dashboard-accent-teal text-dashboard-dark hover:!bg-dashboard-accent-teal/80"
                asChild
              >
                <Link to="/onboarding/step-1">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-dashboard-accent-teal text-dashboard-dark hover:!bg-dashboard-accent-teal/80"
              >
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-dashboard-text-muted">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-dashboard-accent-teal" />
                14-day free trial
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-dashboard-accent-teal" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-dashboard-accent-teal" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pb-20 bg-dashboard-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dashboard-text-primary mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-dashboard-text-muted max-w-3xl mx-auto">
              Our comprehensive CRM platform provides all the tools you need to
              manage customers, track sales, and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Contact Management",
                description:
                  "Organize and track all your customer interactions in one centralized place.",
                color: "dashboard-accent-teal",
              },
              {
                icon: BarChart3,
                title: "Sales Analytics",
                description:
                  "Get powerful insights with detailed reports and real-time dashboards.",
                color: "dashboard-accent-orange",
              },
              {
                icon: MessageSquare,
                title: "Communication Hub",
                description:
                  "Manage emails, calls, and messages from a unified interface.",
                color: "dashboard-accent-blue",
              },
              {
                icon: Calendar,
                title: "Task Automation",
                description:
                  "Automate repetitive tasks and never miss a follow-up again.",
                color: "dashboard-accent-pink",
              },
              {
                icon: Mail,
                title: "Email Marketing",
                description:
                  "Create and send targeted email campaigns to nurture leads.",
                color: "dashboard-accent-teal",
              },
              {
                icon: Phone,
                title: "Call Tracking",
                description:
                  "Record and analyze calls to improve your sales performance.",
                color: "dashboard-accent-orange",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border border-dashboard-sidebar bg-dashboard-card hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-dashboard-text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-dashboard-text-muted">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dashboard-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "10,000+",
                label: "Active Users",
                color: "dashboard-accent-teal",
              },
              {
                number: "99.9%",
                label: "Uptime",
                color: "dashboard-accent-orange",
              },
              {
                number: "150%",
                label: "ROI Increase",
                color: "dashboard-accent-pink",
              },
              {
                number: "24/7",
                label: "Support",
                color: "dashboard-accent-blue",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-3xl md:text-4xl font-bold text-${stat.color} mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-dashboard-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-dashboard-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-dashboard-text-primary mb-4">
              Choose your plan
            </h2>
            <p className="text-xl text-dashboard-text-muted max-w-3xl mx-auto">
              Select the perfect plan for your needs. You can always upgrade or
              downgrade later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 border-dashboard-sidebar bg-dashboard-card">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-dashboard-text-primary">
                  Starter
                </CardTitle>
                <CardDescription className="text-dashboard-text-muted">
                  Perfect for small teams
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-dashboard-text-primary">
                    $29
                  </span>
                  <span className="text-dashboard-text-muted">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Up to 1,000 contacts",
                  "Basic reporting",
                  "Email integration",
                  "Mobile app access",
                  "Community support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-dashboard-accent-teal" />
                    <span className="text-dashboard-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
                <Button
                  className="w-full mt-6 bg-dashboard-accent-teal text-dashboard-dark hover:!bg-dashboard-accent-teal/80"
                  asChild
                >
                  <Link to="/onboarding/step-1">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan - Most Popular */}
            <Card className="border-2 border-dashboard-accent-teal relative bg-dashboard-card">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-dashboard-accent-teal text-dashboard-dark">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-dashboard-text-primary">
                  Pro
                </CardTitle>
                <CardDescription className="text-dashboard-text-muted">
                  Best for growing businesses
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-dashboard-text-primary">
                    $79
                  </span>
                  <span className="text-dashboard-text-muted">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Up to 10,000 contacts",
                  "Advanced analytics",
                  "Email marketing",
                  "API integrations",
                  "Priority support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-dashboard-accent-teal" />
                    <span className="text-dashboard-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
                <Button
                  className="w-full mt-6 bg-dashboard-accent-teal text-dashboard-dark hover:bg-opacity-90"
                  asChild
                >
                  <Link to="/onboarding/step-1">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-dashboard-sidebar bg-dashboard-card">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-dashboard-text-primary">
                  Enterprise
                </CardTitle>
                <CardDescription className="text-dashboard-text-muted">
                  For large organizations
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-dashboard-text-primary">
                    $199
                  </span>
                  <span className="text-dashboard-text-muted">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Unlimited contacts",
                  "Custom integrations",
                  "Advanced security",
                  "Dedicated support",
                  "Custom training",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-dashboard-accent-teal" />
                    <span className="text-dashboard-text-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
                <Button
                  className="w-full mt-6 border-dashboard-accent-blue text-dashboard-accent-blue hover:bg-dashboard-accent-blue hover:text-dashboard-dark"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trial Notice */}
          <div className="mt-12 p-6 bg-dashboard-card rounded-lg border border-dashboard-sidebar max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-dashboard-accent-orange rounded-full flex items-center justify-center mt-0.5">
                <Clock className="w-3 h-3 text-dashboard-dark" />
              </div>
              <div>
                <h3 className="font-semibold text-dashboard-text-primary mb-1">
                  14-day free trial included
                </h3>
                <p className="text-sm text-dashboard-text-muted">
                  No credit card required. Cancel anytime during your trial
                  period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dashboard-accent-teal to-dashboard-accent-blue">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-dashboard-dark mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-dashboard-dark/80 mb-8">
            Join thousands of businesses already using CRMPro to grow their
            revenue and improve customer relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-base bg-dashboard-dark text-dashboard-text-primary hover:bg-dashboard-card"
              asChild
            >
              <Link to="/onboarding/step-1">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base bg-transparent border-dashboard-dark text-dashboard-dark hover:bg-dashboard-dark hover:text-dashboard-text-primary"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dashboard-dark text-dashboard-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-dashboard-accent-teal rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-dashboard-dark" />
                </div>
                <span className="text-xl font-bold text-dashboard-text-primary">
                  CRMPro
                </span>
              </div>
              <p className="text-dashboard-text-muted">
                The modern CRM solution for growing businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-dashboard-text-primary mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-dashboard-text-primary mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-dashboard-text-primary mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-dashboard-text-primary transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dashboard-sidebar mt-12 pt-8 text-center">
            <p className="text-dashboard-text-muted">
              © 2024 CRMPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
