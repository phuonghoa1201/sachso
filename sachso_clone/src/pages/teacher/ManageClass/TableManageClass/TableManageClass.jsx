import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
function TableManageClass({ classes }) {
    const navigate = useNavigate();
    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Mã lớp',
            dataIndex: 'shortCode',
            key: 'shortCode',
        },
        {
            title: 'Tên lớp',
            dataIndex: 'nameofClass',
            key: 'nameofClass',
            render: nameofClass => (
                <span>
                    <UserOutlined className="mr-2" />
                    {nameofClass}
                </span>
            )
        },
        {
            title: 'Sỉ số',
            dataIndex: 'totalStudent',
            key: 'totalStudent',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'noteClass',
            key: 'noteClass',
        },


    ];
    const handleRowClick = record => {
        navigate(`${record._id}`)
       

    };

    return (
        <div>
            <Table
                dataSource={classes.map(c => ({ ...c, key: c._id }))}
                columns={columns}
                scroll={{ x: 'max-content' }}
                onRow={record => ({
                    onClick: () => handleRowClick(record),

                })}
                bordered />
        </div>

    );

}

export default TableManageClass