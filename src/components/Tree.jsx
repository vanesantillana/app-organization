import React,{ useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { Empty, Card, Row, Col, Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getLeadersFromExcel, isSameMonth, getChildrens, getNameMonth, isSalaryIncrease, isHiredThisMonth } from '../functions/helper';

const NodeCard = ({item, addChildrens, salaryIncrease}) => {
  return (
    <div className="item" onClick={()=>addChildrens()}>
      <Row justify="center">
        <Col flex="300px">
          <Card size="small" title={
              <div>
                <Avatar icon={<UserOutlined />} />
                <h3>{item.name}</h3>
                <span>{ item.hierarchical_level }</span>
              </div>
            }>
            { isHiredThisMonth(item) && <Tag color="success"> Recién contratado </Tag>}
            { salaryIncrease && <Tag color="gold">Salario Incrementado</Tag>}
            <p>Área: { item.area }</p>
            <p>Salario: { salaryIncrease && salaryIncrease + " - " }{ item.salary }</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const Node = ({item, dataByMonth, allData}) => {
  const [myItem, setMyItem] = useState(item);
  const addChildren = () =>{
    let tempItem = {...myItem};
    tempItem.children = getChildrens(item, dataByMonth);
    setMyItem(tempItem)
  }
  const salaryIncrease =  isSalaryIncrease(allData, item);
  return (
    <TreeNode label={<NodeCard item={myItem} addChildrens={addChildren} salaryIncrease={salaryIncrease}/>}>
      { myItem.children && myItem.children.map( (child) => ( <Node item={child} dataByMonth={dataByMonth} allData={allData}/> )) }
    </TreeNode>
  )
}

const Organigram = ({allData, selectedDate}) => {
  const dataByMonth = allData.filter(item=> isSameMonth(item.month, selectedDate) )
  const leaders = getLeadersFromExcel(dataByMonth);
  return (
    <Tree
      lineWidth={"2px"}
      lineColor={"#2930ff"}
      lineBorderRadius={"10px"}
      label={<div className="item">Organigrama { getNameMonth(selectedDate) }</div>}>
        { leaders.map((item, index) => (<Node key={index+1} item={item} dataByMonth={dataByMonth} allData={allData}/>)) }
    </Tree>
  )
}

const CustomTree = ({data, selectedDate}) => (
  !!data ? <Organigram allData={data} selectedDate={selectedDate}/>: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
);

export default CustomTree;