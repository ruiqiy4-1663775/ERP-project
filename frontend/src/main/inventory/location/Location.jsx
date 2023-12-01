// This is the handler of location
import Container from "../../../components/Container";
import AddLocation from "./AddLocation";
import FindLocation from "./findLocation/FindLocation";
function Location() {
    return (
        <div className="space-y-10">
            <Container width={'w-[95%]'}>
                <AddLocation />
            </Container>
            <Container width={'w-[95%]'}>
                <FindLocation />
            </Container>
        </div>
    );
  };
  
  export default Location;