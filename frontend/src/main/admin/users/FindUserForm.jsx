import Form from '../components/Form2'

function FindUserForm() {
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
            <h1 className="text-xl font-semibold">Find User</h1>
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

export default FindUserForm;