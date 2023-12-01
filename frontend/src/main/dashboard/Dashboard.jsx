import Container from "../../components/Container";

function Dashboard() {
    return (
        <div className="flex flex-col h-full grow overflow-auto py-5 bg-slate-100">
            <h1 className="text-xl font-semibold mb-4 italic px-5">
                Dashboard
            </h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-y-8">
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Monthly Sales Trend Over The Year</h1>
                    <div className="h-52">
                        content for widget 1
                    </div>
                    {/* Other content goes here */}
                </Container>
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Ten Most Recent Orders</h1>
                    content for widget 2
                    {/* Other content goes here */}
                </Container>
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Widget 3</h1>
                    <div className="h-64">content for widget 3</div>

                    {/* Other content goes here */}
                </Container>
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Widget 4</h1>
                    content for widget 4
                </Container>
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Widget</h1>
                    <div className="h-64">content for widget</div>
                </Container>
                <Container width={"w-11/12"}>
                    <h1 className="text-lg font-semibold mb-4">Widget</h1>
                    <div className="h-64">content for widget</div>
                </Container>
                </div>


        </div>
    )
}

export default Dashboard;