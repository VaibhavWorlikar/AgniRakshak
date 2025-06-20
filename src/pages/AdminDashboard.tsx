
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, MapPin, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { user, userProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({
    active: 0,
    contained: 0,
    resolved: 0,
    total: 0
  });

  useEffect(() => {
    if (!isLoading && (!user || userProfile?.role !== 'admin')) {
      navigate('/auth');
    }
  }, [user, userProfile, isLoading, navigate]);

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchReports();
    }
  }, [userProfile]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('incident_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setReports(data);
      const active = data.filter(r => r.status === 'active').length;
      const contained = data.filter(r => r.status === 'contained').length;
      const resolved = data.filter(r => r.status === 'resolved').length;
      setStats({
        active,
        contained,
        resolved,
        total: data.length
      });
    }
  };

  const updateReportStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('incident_reports')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchReports();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'contained': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || userProfile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage fire incident reports and monitor response activities</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Contained</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.contained}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Incident Reports
              </CardTitle>
              <CardDescription>
                View and manage all fire incident reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="contained">Contained</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{report.reporter_name}</div>
                              <div className="text-sm text-gray-500">{report.reporter_phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{report.fire_type}</TableCell>
                          <TableCell className="max-w-xs truncate">{report.location}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={getPriorityColor(report.priority)}>
                            {report.priority}
                          </TableCell>
                          <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {report.status === 'active' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateReportStatus(report.id, 'contained')}
                                >
                                  Mark Contained
                                </Button>
                              )}
                              {report.status === 'contained' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateReportStatus(report.id, 'resolved')}
                                >
                                  Mark Resolved
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {['active', 'contained', 'resolved'].map((status) => (
                  <TabsContent key={status} value={status}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reporter</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports.filter(r => r.status === status).map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{report.reporter_name}</div>
                                <div className="text-sm text-gray-500">{report.reporter_phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{report.fire_type}</TableCell>
                            <TableCell className="max-w-xs truncate">{report.location}</TableCell>
                            <TableCell className={getPriorityColor(report.priority)}>
                              {report.priority}
                            </TableCell>
                            <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                {status === 'active' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateReportStatus(report.id, 'contained')}
                                  >
                                    Mark Contained
                                  </Button>
                                )}
                                {status === 'contained' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateReportStatus(report.id, 'resolved')}
                                  >
                                    Mark Resolved
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
