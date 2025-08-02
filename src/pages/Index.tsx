import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Globe, Lock } from 'lucide-react';
import Layout from '@/components/Layout';
import { useNavigate } from 'react-router-dom';

interface ProxyService {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  price_monthly: number;
  price_annual: number;
  bandwidth_limit: string;
  concurrent_connections: number;
  features: any;
}

const Index = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<ProxyService[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('proxy_services')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (serviceId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // TODO: Implement subscription logic
    console.log('Subscribe to service:', serviceId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vpn':
        return <Shield className="h-5 w-5 text-primary" />;
      case 'socks5':
        return <Lock className="h-5 w-5 text-primary" />;
      default:
        return <Globe className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Premium Proxy & VPN Services</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Secure, fast, and reliable proxy solutions for your privacy needs
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>High Speed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Global Locations</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              Loading services...
            </div>
          ) : (
            services.map((service) => (
              <Card key={service.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      {getTypeIcon(service.type)}
                      <span>{service.name}</span>
                    </CardTitle>
                    <Badge variant="secondary">{service.type.toUpperCase()}</Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Location:</strong> {service.location}</p>
                    <p className="text-sm"><strong>Bandwidth:</strong> {service.bandwidth_limit}</p>
                    <p className="text-sm"><strong>Connections:</strong> {service.concurrent_connections}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(service.features) && service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly:</span>
                      <span className="font-bold">${service.price_monthly}/mo</span>
                    </div>
                    {service.price_annual && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Annual:</span>
                        <span className="font-bold">${service.price_annual}/yr</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleSubscribe(service.id)}
                  >
                    {user ? 'Subscribe Now' : 'Sign In to Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
