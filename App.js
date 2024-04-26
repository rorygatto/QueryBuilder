import logo from './logo.svg';
import './App.css';
//
import React from "react";
import ReactDOM from "react-dom";
// import { Layout, Divider, Empty, Select } from "antd";
import { Layout, Divider, Empty, Select, Table } from "antd";
// import { QueryBuilder } from "@cubejs-client/react";
import { QueryBuilder, CubeProvider, useCubeQuery, CubeContext} from "@cubejs-client/react";
import { find, propEq } from "ramda";
// import cubejs from "@cubejs-client/core";
import cube from '@cubejs-client/core';
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import ChartRenderer from "./ChartRenderer";
const cubeApiX = cube( 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQxNTg3Nzh9.f5CgJzcAV2aFUHvLtpNE-wUPVVxj5LMaBHoH5xTO_Dw', 
  { apiUrl: 'https://yelling-wasp.aws-us-west-2.cubecloudapp.dev/cubejs-api/v1' } 
); 


function App() {

  const inComingQuery = () => {
  };

  const { resultSet, isLoading, error, progress } = useCubeQuery(
    { 
    "measures":["Orders.count"],
    },
    {cubeApi: cubeApiX}
  ); 

  if (isLoading) {
    return <div>{progress && progress.stage && progress.stage.stage || 'Loading...'}</div>;
  }
 
  if (error) {
    return <div>{error.toString()}</div>;
  }
 
  if (!resultSet) {
    return null;
  }
 
  // const dataSource = resultSet.tablePivot();
  // const columns = resultSet.tableColumns();
  const dataSource = resultSet.tablePivot();
  const columns = resultSet.tableColumns();

  

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        QUERY BUILDER 
        {inComingQuery()} 
        <CubeProvider cubeApi={cubeApiX}></CubeProvider>
        {/* <Table columns={columns} dataSource={dataSource} /> */}
        <QueryBuilder 
    query={{
      // timeDimensions: [
      //   {
      //     dimension: "LineItems.createdAt",
      //     granularity: "month"
      //   }
      // ]
    }}
    // cubejsApi={cubejsApi}
    cubeApi={cubeApiX}
    render={({ resultSet, measures, availableMeasures, updateMeasures }) => (
      <Layout.Content style={{ padding: "20px" }}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          onSelect={(m) =>
            updateMeasures.add(find(propEq("name", m))(availableMeasures))
          }
          onDeselect={(m) =>
            updateMeasures.remove(find(propEq("name", m))(availableMeasures))
          }
        >
          {availableMeasures.map((measure) => (
            <Select.Option key={measure.name} value={measure.name}>
              {measure.title}
            </Select.Option>
          ))}
        </Select>
        <Divider />
        {measures.length > 0 ? (
          // <ChartRenderer resultSet={resultSet} />
          // <Table columns={columns} dataSource={dataSource} />
          <Table columns={columns} dataSource={dataSource} />
          
        ) : (
          <Empty description="Select a measure to get started" />
        )}
      </Layout.Content>
    )}
  />
        <a
          // className="App-link"
          // href="https://reactjs.org"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
