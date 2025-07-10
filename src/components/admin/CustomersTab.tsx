import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CustomersTabProps {
  isAdmin: boolean;
}

const CustomersTab = ({ isAdmin }: CustomersTabProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isAdmin) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*');

          if (error) throw error;
          
          const transformedUsers: User[] = (data || []).map(profile => ({
            id: profile.id,
            email: '',
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            isAdmin: profile.is_admin || false,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at
          }));

          setUsers(transformedUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [isAdmin]);

  const handleToggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_admin: !currentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;
      
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, isAdmin: !currentStatus } : user
        )
      );
      
      toast.success(`User admin status updated`);
    } catch (error) {
      console.error("Error updating user admin status:", error);
      toast.error("Failed to update user admin status");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">Customer Management</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Admin Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  `}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleAdminStatus(user.id, user.isAdmin)}
                  >
                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default CustomersTab;