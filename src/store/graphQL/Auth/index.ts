import { gql } from "@apollo/client";
export const LOG_OUT = gql`  mutation logout($deviceToken: String) {  logout(data: { deviceToken: $deviceToken })  }`;
