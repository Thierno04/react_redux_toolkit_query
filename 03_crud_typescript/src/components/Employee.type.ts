export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// export const dummyEmployeeList: IEmployee[] = [
//   {
//     id: new Date().toJSON().toString(),
//     firstName: "Dummy1",
//     lastName: "Dummy11",
//     email: "dummy@gmail.com",
//   },
// ];

export enum PageEnum {
  list,
  add,
  edit,
}
