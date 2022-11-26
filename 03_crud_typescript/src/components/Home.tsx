import React, { useEffect, useState } from 'react'
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { IEmployee, PageEnum } from './Employee.type'
import EmployeeList from './EmployeeList';

const Home = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      _setEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const onAddEmployeeClickHand = () => {
    setShownPage(PageEnum.add)
  }

  const showListPage = () => {
    setShownPage(PageEnum.list)
  }

  const _setEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  const addEmployee = (data: IEmployee) => {
    _setEmployeeList([...employeeList, data])
  }

  const deleteEmployee = (data: IEmployee) => {
    const indexToDelete = employeeList.indexOf(data);
    const templist = [...employeeList]

    templist.splice(indexToDelete, 1);
    _setEmployeeList(templist)
  }

  const editEmployeeData = (data: IEmployee) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
  }

  const updateData = (data: IEmployee) => {
    const filteredData = employeeList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = employeeList.indexOf(filteredData);
    const tempData = [...employeeList];
    tempData[indexOfRecord] = data;
    _setEmployeeList(tempData);
  }

  return (
    <>
      <article className="article-header">
        <header>
          <h1>React: Simple CRUD Application</h1>
        </header>
      </article>

      <section className="section-content">
        {shownPage === PageEnum.list && (
          <>
            <input type="button" value="Add Employee" onClick={onAddEmployeeClickHand} />
            <EmployeeList list={employeeList} onDeleteClickHnd={deleteEmployee} onEdit={editEmployeeData} />
          </>
        )}

        {
          shownPage === PageEnum.add && (
            <AddEmployee onBackBtnClickHnd={showListPage} onSubmitClickHnd={addEmployee} />
          )
        }

        {
          shownPage === PageEnum.edit && <EditEmployee data={dataToEdit} onBackBtnClickHnd={showListPage} onUpdateClickHnd={updateData} />
        }
      </section>
    </>
  )
}

export default Home