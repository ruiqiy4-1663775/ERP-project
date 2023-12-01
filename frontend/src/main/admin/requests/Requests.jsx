import Container from "../../../components/Container";
import Form from '../components/Form_requests'

function RequestForm() {
    let fields = [
        {
            databaseName: 'username',
            label: 'Username',
        },
        {
            databaseName: 'name',
            label: 'Name'
        },
        {
            databaseName: 'email',
            label: 'Email'
        },
        {
            databaseName: 'role',
            label: 'Role'
        }
    ]
    let changeableFields = [
        {
            databaseName: 'username',
            label: 'Username',
        },
        {
            databaseName: 'name',
            label: 'Name'
        },
        {
            databaseName: 'email',
            label: 'Email'
        },
        {
            databaseName: 'role',
            label: 'Role'
        },
        {
            databaseName: 'password',
            label: 'Password'
        }
    ]

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Price Change Requests</h1>
            <Form 
                fields={fields} 
                url={'/api/find_user'} 
                tablename={'Users'} 
                changeableFields={changeableFields}
                buttonName={'Find User'}
                tableKey={'username'}/>
        </div>
    );
}


function Requests() {
    return (
        <div className="space-y-10">
            <Container width={"w-[95%]"}>
                <RequestForm/>
            </Container>
        </div>
    )
}

export default Requests;