import { useState } from "react";

function Foo(){
    const [bar, setBar] = useState(0);

    console.log(bar);

    return (
        <button  onClick={()=> setBar(bar+1)}>
        <div>
            {bar}
        </div>
        </button>
    );
}

export default Foo;