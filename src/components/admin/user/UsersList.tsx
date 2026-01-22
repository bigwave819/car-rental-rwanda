import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



interface user {
    id: string
    name: string;
    email: string;
    role: string | null;
}

interface UserListProps {
    users: user[]
}

function UsersList({ users }: UserListProps) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>name</TableHead>
                        <TableHead>email</TableHead>
                        <TableHead>role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default UsersList;