import Form from './FormAudit'
import Container from "../../../components/Container";

function Audition() {
    let fields = [
        {
            Name: 'Username',
        },
        {
            Name: 'Activity',
        }
    ]

    return (
        <div className='animate__animated animate__fadeIn space-y-10'>
             <h1 className="text-xl font-bold mb-4">This function will be redesigned</h1>
        <Container width={"w-[95%]"}>
            <div className="w-full">
                <h1 className="text-xl font-bold mb-4">User Activity</h1>
                <Form 
                    fields={fields} 
                    url={'/api/audition'} 
                    buttonName={'Find Record'}/>
            </div>
        </Container>
        </div>
    );
}

export default Audition;