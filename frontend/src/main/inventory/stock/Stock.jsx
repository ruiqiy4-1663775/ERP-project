import Container from "../../../components/Container"
import { useEffect, useMemo} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import useAxios from "../../../utils/useAxios";

function Stock() {
    const { data, get } = useAxios()
    const formattedData = useMemo(() => {
        return data ? format(data) : null;
      }, [data]);

    useEffect(() => {
        get('/api/stocks')
    }, [get]);

    function format(data) {
        let formatData = {}
        for (let row of data) {
            if (formatData[row['location_id']]) {
                formatData[row['location_id']].push(row)
            } else {
                formatData[row['location_id']] = [row]
            }
        }
        return formatData
    }

    return (
        <div className="space-y-10">
            {formattedData && Object.keys(formattedData).map((locationId, index) =>
            <div className="max-h-96 overflow-auto" key={index}>
                <Container width={"w-[95%]"}>
                    <h1 className="text-xl font-bold mb-4">Stock Levels at Location: {locationId}</h1>
                    <ResponsiveContainer width="100%" height={formattedData[locationId].length * 70}>
                        <BarChart
                            data={formattedData[locationId]}
                            layout="vertical"
                        >
                            <XAxis type="number" />
                            <YAxis dataKey="product_id" type="category">
                                <Label value="Product ID" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                            </YAxis>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Container>
                </div>
            )}
        </div>
    )
}

export default Stock