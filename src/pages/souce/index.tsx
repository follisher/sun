import { Card, Space, Table, Tree } from "antd";
import { useAuditSource, useCityTree } from "../../hooks/audit";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Source() {
  const { citieTree, getCitieTree } = useCityTree();
  const { auditSources, getAuditSource } = useAuditSource();
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    getCitieTree();
  }, []);

  useEffect(() => {
    if (citieTree.length > 0 && params.id) {
      const city = citieTree.find((item) => item.id === params.id);
      if (!city) return;
      getAuditSource({
        begiontime: "2021-01-01",
        stationid: city.id,
        stationname: city.name,
        state: "audit",
        smallstate: 0,
      });
    }
  }, [citieTree]);

  function handlerTreeClick(_: Key[], { node }: { node: cityTreeResult }) {
    getAuditSource({
      begiontime: "2021-01-01",
      stationid: node.id,
      stationname: node.name,
      state: "audit",
      smallstate: 0,
    });
  }

  return (
    <Space align="start">
      <Card>
        <Tree
          onSelect={handlerTreeClick}
          expandedKeys={["0"]}
          selectedKeys={selectedKeys}
          treeData={citieTree
            .filter((item) => !item.open)
            .map((item) => {
              // if (params && item.id === params?.id) {
              //   setSelectedKeys([item.id]);
              // }
              return {
                id: item.id,
                key: "0",
                title: item.name,
                pId: item.pId,
                open: item.open,
                name: item.name,
                children: citieTree
                  .filter((child) => child.pId === item.id)
                  .map((child, idx) => {
                    // if (params && child.id === params?.id) {
                    //   setSelectedKeys([child.id]);
                    // }
                    return {
                      id: child.id,
                      key: "0-" + idx,
                      title: child.name,
                      pId: child.pId,
                      open: child.open,
                      name: child.name,
                    };
                  }),
              };
            })}
        />
      </Card>
      <Card>
        <Table dataSource={auditSources} />
      </Card>
    </Space>
  );
}

export default Source;
