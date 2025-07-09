import { useState, useEffect } from 'react';
import { Search, User, Mail, Phone, Globe, MapPin, Building, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User as UserType } from '@/types/Task';
import { toast } from '@/hooks/use-toast';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const kenyanUsers: UserType[] = [
        {
          id: 1,
          name: "Grace Wanjiku Mwangi",
          username: "gwanjiku",
          email: "grace.mwangi@safaricom.co.ke",
          address: {
            street: "Kimathi Street",
            suite: "Floor 12, Suite 1205",
            city: "Nairobi",
            zipcode: "00100",
            geo: { lat: "-1.2921", lng: "36.8219" }
          },
          phone: "+254 722 345 678",
          website: "gracemwangi.co.ke",
          company: {
            name: "Safaricom PLC",
            catchPhrase: "Transforming lives through innovative technology",
            bs: "mobile telecommunications and digital services"
          }
        },
        {
          id: 2,
          name: "David Kiprotich Ruto",
          username: "dkruto",
          email: "david.ruto@equitybank.co.ke",
          address: {
            street: "Eldoret-Nakuru Highway",
            suite: "Branch Office 204",
            city: "Eldoret",
            zipcode: "30100",
            geo: { lat: "0.5143", lng: "35.2697" }
          },
          phone: "+254 733 456 789",
          website: "davidruto.com",
          company: {
            name: "Equity Bank Kenya",
            catchPhrase: "Banking solutions for every Kenyan",
            bs: "financial services and banking"
          }
        },
        {
          id: 3,
          name: "Fatuma Hassan Omar",
          username: "fhomar",
          email: "fatuma.omar@kenyaairways.com",
          address: {
            street: "Moi Avenue",
            suite: "Coastal Plaza, Floor 8",
            city: "Mombasa",
            zipcode: "80100",
            geo: { lat: "-4.0435", lng: "39.6682" }
          },
          phone: "+254 744 567 890",
          website: "fatumaomar.ke",
          company: {
            name: "Kenya Airways",
            catchPhrase: "The Pride of Africa connecting Kenya to the world",
            bs: "aviation and cargo services"
          }
        },
        {
          id: 4,
          name: "John Ochieng Otieno",
          username: "jochieng",
          email: "john.otieno@eastafricanbreweries.com",
          address: {
            street: "Oginga Odinga Street",
            suite: "Industrial Area, Block C",
            city: "Kisumu",
            zipcode: "40100",
            geo: { lat: "-0.0917", lng: "34.7680" }
          },
          phone: "+254 755 678 901",
          website: "johnotieno.co.ke",
          company: {
            name: "East African Breweries",
            catchPhrase: "Celebrating life's moments across East Africa",
            bs: "beverage manufacturing and distribution"
          }
        },
        {
          id: 5,
          name: "Mary Njeri Kamau",
          username: "mnjeri",
          email: "mary.kamau@cooperativebank.co.ke",
          address: {
            street: "Kenyatta Avenue",
            suite: "Cooperative House, Floor 15",
            city: "Nakuru",
            zipcode: "20100",
            geo: { lat: "-0.3031", lng: "36.0800" }
          },
          phone: "+254 766 789 012",
          website: "marykamau.ke",
          company: {
            name: "Co-operative Bank of Kenya",
            catchPhrase: "Your partner in cooperative development",
            bs: "cooperative banking and microfinance"
          }
        },
        {
          id: 6,
          name: "Ahmed Ali Hassan",
          username: "ahassan",
          email: "ahmed.hassan@kpa.co.ke",
          address: {
            street: "Port Reitz Road",
            suite: "KPA Towers, Floor 10",
            city: "Mombasa",
            zipcode: "80100",
            geo: { lat: "-4.0619", lng: "39.6364" }
          },
          phone: "+254 777 890 123",
          website: "ahmedhassan.co.ke",
          company: {
            name: "Kenya Ports Authority",
            catchPhrase: "Gateway to East and Central Africa",
            bs: "port operations and logistics"
          }
        },
        {
          id: 7,
          name: "Catherine Wanjiru Ndung'u",
          username: "cwanjiru",
          email: "catherine.ndungu@kcb.co.ke",
          address: {
            street: "Kencom House",
            suite: "Moi Avenue, Floor 7",
            city: "Nairobi",
            zipcode: "00100",
            geo: { lat: "-1.2841", lng: "36.8197" }
          },
          phone: "+254 788 901 234",
          website: "catherinendungu.ke",
          company: {
            name: "Kenya Commercial Bank",
            catchPhrase: "Simpler, better banking for all Kenyans",
            bs: "commercial banking and financial services"
          }
        },
        {
          id: 8,
          name: "Samuel Kipchoge Rotich",
          username: "skrotich",
          email: "samuel.rotich@tusker.co.ke",
          address: {
            street: "Industrial Area Road",
            suite: "Tusker Brewery, Office Block A",
            city: "Nairobi",
            zipcode: "00100",
            geo: { lat: "-1.3197", lng: "36.8510" }
          },
          phone: "+254 799 012 345",
          website: "samuelrotich.com",
          company: {
            name: "Tusker Breweries",
            catchPhrase: "Bringing Kenyans together one tusker at a time",
            bs: "beer brewing and hospitality"
          }
        },
        {
          id: 9,
          name: "Esther Nyambura Githae",
          username: "enyambura",
          email: "esther.githae@nhif.or.ke",
          address: {
            street: "Ragati Road",
            suite: "NHIF Building, Floor 5",
            city: "Nairobi",
            zipcode: "00100",
            geo: { lat: "-1.2695", lng: "36.8065" }
          },
          phone: "+254 710 123 456",
          website: "esthergithae.ke",
          company: {
            name: "National Hospital Insurance Fund",
            catchPhrase: "Affordable healthcare for all Kenyans",
            bs: "health insurance and medical services"
          }
        },
        {
          id: 10,
          name: "Peter Mwangi Kariuki",
          username: "pmwangi",
          email: "peter.kariuki@bamburi.co.ke",
          address: {
            street: "Bamburi Road",
            suite: "Bamburi Cement, Head Office",
            city: "Mombasa",
            zipcode: "80100",
            geo: { lat: "-3.9875", lng: "39.7345" }
          },
          phone: "+254 721 234 567",
          website: "peterkariuki.co.ke",
          company: {
            name: "Bamburi Cement",
            catchPhrase: "Building Kenya's infrastructure for the future",
            bs: "cement manufacturing and construction materials"
          }
        }
      ];
      
      setUsers(kenyanUsers);
      setFilteredUsers(kenyanUsers);
      toast({
        title: "Users Loaded",
        description: `Successfully loaded ${kenyanUsers.length} Kenyan professionals.`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
        <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative mb-8">
                <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Loading Kenyan Professionals
              </h3>
              <p className="text-muted-foreground text-lg">
                Discovering talented individuals from Kenya's leading companies...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
        <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-destructive/20 to-warning/20 rounded-full blur-xl opacity-50"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">Error Loading Professionals</h3>
                <p className="text-muted-foreground mb-6 text-base leading-relaxed">{error}</p>
                <Button 
                  onClick={fetchUsers} 
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300 shadow-lg hover:shadow-primary/30"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
        {/* Header with enhanced gradient background */}
        <div className="mb-8 text-center">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent-foreground bg-clip-text text-transparent animate-fade-in">
              Kenyan Professionals Directory
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Discover talented professionals from Kenya's leading companies and organizations
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-accent/20 rounded-lg blur-xl opacity-30 animate-glow"></div>
          </div>
        </div>

        {/* Enhanced Search and Stats Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by name, email, username, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <User className="h-4 w-4 mr-2" />
              {filteredUsers.length} of {users.length} professionals
            </Badge>
            <Button 
              onClick={fetchUsers} 
              variant="outline" 
              size="lg"
              className="group bg-background/50 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        {filteredUsers.length === 0 ? (
          <Card className="bg-card/60 backdrop-blur-sm border-border/50">
            <CardContent className="p-16 text-center">
              <div className="relative">
                <User className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">No professionals found</h3>
              <p className="text-muted-foreground text-lg">
                {searchTerm ? 'Try adjusting your search terms to find more professionals.' : 'No professionals available at the moment.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {paginatedUsers.map((user, index) => (
                <Card 
                  key={user.id} 
                  className="group h-full bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                            {user.name.charAt(0)}
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {user.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground font-medium">@{user.username}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm group/item hover:text-primary transition-colors duration-200">
                        <Mail className="h-4 w-4 text-muted-foreground group-hover/item:text-primary flex-shrink-0" />
                        <span className="truncate font-medium">{user.email}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm group/item hover:text-primary transition-colors duration-200">
                        <Phone className="h-4 w-4 text-muted-foreground group-hover/item:text-primary flex-shrink-0" />
                        <span className="font-medium">{user.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm group/item hover:text-accent-foreground transition-colors duration-200">
                        <Globe className="h-4 w-4 text-muted-foreground group-hover/item:text-accent-foreground flex-shrink-0" />
                        <span className="truncate font-medium text-accent-foreground">{user.website}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm group/item hover:text-success transition-colors duration-200">
                        <MapPin className="h-4 w-4 text-muted-foreground group-hover/item:text-success flex-shrink-0" />
                        <span className="truncate font-medium">{user.address.city}, {user.address.zipcode}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm group/item hover:text-warning transition-colors duration-200">
                        <Building className="h-4 w-4 text-muted-foreground group-hover/item:text-warning flex-shrink-0" />
                        <span className="truncate font-semibold">{user.company.name}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50">
                      <div className="relative p-4 bg-gradient-to-r from-accent/30 via-primary/5 to-accent/30 rounded-lg border border-border/30">
                        <p className="text-sm text-muted-foreground italic font-medium leading-relaxed">
                          "{user.company.catchPhrase}"
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-background/50 border-border/50 hover:bg-primary/5 hover:border-primary/30 disabled:opacity-50 transition-all duration-300"
                >
                  Previous
                </Button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = totalPages <= 5 ? i + 1 : 
                      currentPage <= 3 ? i + 1 :
                      currentPage >= totalPages - 2 ? totalPages - 4 + i :
                      currentPage - 2 + i;
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="lg"
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 ${
                          currentPage === page 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                            : 'bg-background/50 border-border/50 hover:bg-primary/5 hover:border-primary/30'
                        } transition-all duration-300`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-background/50 border-border/50 hover:bg-primary/5 hover:border-primary/30 disabled:opacity-50 transition-all duration-300"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}