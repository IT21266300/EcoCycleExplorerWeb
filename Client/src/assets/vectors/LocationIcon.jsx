import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      fill="#52796D"
      d="M32 0c-6.58 0-14.102 10.22-14.102 22.78 0 16.228 13.21 39.862 13.68 40.86.107.23.26.36.422.36.308 0 .601-.13.807-.36.897-.998 21.973-24.632 21.973-40.86C54.78 10.22 44.56 0 32 0Zm0 34.712c-6.59 0-11.932-5.342-11.932-11.932 0-6.59 5.342-11.933 11.932-11.933 6.59 0 11.932 5.343 11.932 11.933S38.59 34.712 32 34.712Z"
    />
    <Path
      fill="#52796D"
      d="M31.578 63.641c-.47-.999-13.68-24.632-13.68-40.861C17.899 10.22 25.422 0 32 0 19.44 0 9.22 10.22 9.22 22.78c0 16.228 21.077 39.862 21.974 40.86.205.23.499.36.806.36-.16 0-.314-.13-.422-.359Z"
      opacity={0.8}
    />
  </Svg>
)
export default LocationIcon
