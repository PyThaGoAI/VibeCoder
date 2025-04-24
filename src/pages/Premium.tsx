
import React from 'react';
import { CheckCircle, Star, Sparkles, Zap, Shield, Package, Cpu, MessageCircle, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-400" />,
      title: "AI Code Assistance",
      description: "Get smart code suggestions and autocompletions powered by advanced AI"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Enhanced Security",
      description: "Industry-leading security with private repositories and encrypted storage"
    },
    {
      icon: <Cpu className="h-8 w-8 text-green-400" />,
      title: "Unlimited Compute",
      description: "No limits on processing power or compilation time for your projects"
    },
    {
      icon: <Package className="h-8 w-8 text-orange-400" />,
      title: "Premium Extensions",
      description: "Access to exclusive premium extensions and integrations"
    },
    {
      icon: <Users className="h-8 w-8 text-pink-400" />,
      title: "Team Collaboration",
      description: "Real-time collaborative editing with unlimited team members"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-teal-400" />,
      title: "Priority Support",
      description: "24/7 priority support from our expert development team"
    }
  ];
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic IDE features",
        "Limited compute resources",
        "Public repositories only",
        "Community support"
      ],
      cta: "Current Plan",
      disabled: true,
      popular: false
    },
    {
      name: "Professional",
      price: "$12",
      period: "per month",
      features: [
        "All Free features",
        "AI assistance (limited)",
        "Private repositories",
        "Extended compute resources",
        "Basic integrations"
      ],
      cta: "Upgrade Now",
      disabled: false,
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      features: [
        "All Professional features",
        "Unlimited AI assistance",
        "Unlimited compute resources",
        "Team collaboration",
        "Premium extensions",
        "Priority 24/7 support",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      disabled: false,
      popular: false
    }
  ];
  
  return (
    <div className="min-h-screen bg-ide-background pb-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        
        {/* Header section */}
        <div className="relative z-10 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl glow-text mb-6">
              Elevate Your Coding Experience
            </h1>
            <div className="flex justify-center mb-8">
              <div className="premium-badge text-sm px-3 py-1">PREMIUM IDE</div>
            </div>
            <p className="text-xl text-ide-muted max-w-2xl mx-auto">
              Unlock advanced features, AI assistance, and seamless collaboration with VibeCoder Premium.
            </p>
          </div>
        </div>
      </div>
      
      {/* Features grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold glow-text mb-4">Premium Features</h2>
          <p className="text-ide-muted max-w-3xl mx-auto">
            Supercharge your development workflow with these powerful premium capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="premium-card p-6 hover-scale">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-ide-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pricing section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
        
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold glow-text mb-4">Choose Your Plan</h2>
          <p className="text-ide-muted max-w-3xl mx-auto">
            Select the perfect plan that suits your needs and take your coding to the next level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-xl overflow-hidden border ${plan.popular ? 'border-ide-accent/50 dark:border-ide-accent/30 shadow-premium' : 'border-ide-border dark:border-ide-border/20'} bg-white dark:bg-[#131723] relative`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-ide-accent text-white text-xs px-3 py-1 rounded-bl-lg flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-ide-muted ml-1">/{plan.period}</span>
                </div>
                <div className="border-t border-ide-border dark:border-ide-border/20 my-6"></div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-ide-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  disabled={plan.disabled} 
                  className={`w-full ${plan.popular ? 'bg-ide-accent hover:bg-ide-accent/90' : ''}`}
                  onClick={() => navigate('/')}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold glow-text mb-4">What Our Users Say</h2>
          <p className="text-ide-muted max-w-3xl mx-auto">
            Join thousands of developers who have transformed their workflow with VibeCoder Premium
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "VibeCoder transformed my development workflow. The AI features alone saved me countless hours of debugging.",
              author: "Sarah Johnson",
              role: "Full Stack Developer"
            },
            {
              quote: "The collaboration features are exceptional. My team can work together seamlessly from anywhere in the world.",
              author: "Michael Chen",
              role: "Engineering Manager"
            },
            {
              quote: "I've tried many IDEs over the years, but VibeCoder Premium is by far the most intuitive and powerful.",
              author: "Alex Rodriguez",
              role: "Software Architect"
            }
          ].map((testimonial, index) => (
            <div key={index} className="glass-panel p-6">
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-premium flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-ide-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-premium opacity-90"></div>
          <div className="relative z-10 p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Coding Experience?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of developers who have transformed their workflow with VibeCoder Premium.
              Upgrade today and take your coding to the next level.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => navigate('/')}
              >
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate('/')}
              >
                Return to IDE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
