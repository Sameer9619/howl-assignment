// import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap';

// export default function index({children}) {
//     const magnetic = useRef(null);

//     useEffect( () => {
//         console.log(children)
//         const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
//         const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

//         magnetic.current.addEventListener("mousemove", (e) => {
//             const { clientX, clientY } = e;
//             const {height, width, left, top} = magnetic.current.getBoundingClientRect();
//             const x = clientX - (left + width/2)
//             const y = clientY - (top + height/2)
//             xTo(x * 0.35);
//             yTo(y * 0.35)
//         })
//         magnetic.current.addEventListener("mouseleave", (e) => {
//             xTo(0);
//             yTo(0)
//         })
//     }, [])

//     return (
//         React.cloneElement(children, {ref:magnetic})
//     )
// }

// added code 

import React, { useEffect, useRef } from 'react'; 
import gsap from 'gsap';

export default function Magnetic({ children }) {

  const magneticRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magneticRef.current, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(magneticRef.current, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      const rect = magneticRef.current.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width/2);  
      const y = clientY - (rect.top + rect.height/2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magneticRef.current.addEventListener("mousemove", handleMouseMove);
    magneticRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      magneticRef.current.removeEventListener("mousemove", handleMouseMove);
      magneticRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magneticRef });
}

