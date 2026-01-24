import Addcars from "@/components/admin/cars/Addcars";



function CarsPage() {
    return (
        <div className="w-full min-h-screen space-y-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <p className="text-muted-foreground">
                        Manage all registered users in one place.
                    </p>
                </div>
                <Addcars />
            </div>

        </div>
    );
}

export default CarsPage;