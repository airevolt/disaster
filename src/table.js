import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Button from "react-bootstrap/Button";


const DatatablePage = (props) => {
  const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
      },
      {
        label: 'Category',
        field: 'category',
        sort: 'asc',
        width: 100

      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 600

      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 200

      },
      {
        label: 'Latitude',
        field: 'latitude',
        sort: 'asc',
        width: 100

      },
      {
        label: 'Longitude',
        field: 'longitude',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Source',
        field: 'source',
        sort: 'asc',
        width: 500
      },
      {
        label: 'Find',
        field: 'find',
        sort: 'asc',
        width: 100
      }
    ],
    rows: []
  };
  props.info.forEach(element => {
      let objToPush = {
          id: element.id,
          category: element.category,
          title: element.title,
          date: element.date,
          latitude: element.coordinatesX,
          longitude: element.coordinatesY,
          source: element.source,
          find:<Button variant="warning"  onClick={(event) => {
            props.fx(element);
          }}>Locate</Button>
      }
      data.rows.push(objToPush)

  });
  return (
    <MDBDataTable
      tbodyTextWhite = "true"
      dark = "true"
      scrollY
      maxHeight="20vh"
      striped
      bordered
      small = "true"
      theadTextWhite
      data={data}
    />
  );
}

export default DatatablePage;