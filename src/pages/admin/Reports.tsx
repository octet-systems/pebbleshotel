import { PageHeader } from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, bookings: 2400 },
  { name: 'Feb', revenue: 3000, bookings: 1398 },
  { name: 'Mar', revenue: 2000, bookings: 9800 },
  { name: 'Apr', revenue: 2780, bookings: 3908 },
  { name: 'May', revenue: 1890, bookings: 4800 },
  { name: 'Jun', revenue: 2390, bookings: 3800 },
  { name: 'Jul', revenue: 3490, bookings: 4300 },
];

const AdminReports = () => {
  return (
    <div>
      <PageHeader title="Reports" />
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue and Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
                <Bar dataKey="bookings" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
