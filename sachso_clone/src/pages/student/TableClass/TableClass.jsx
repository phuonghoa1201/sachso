import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Space } from "antd";
import { useNavigate } from "react-router-dom";
function TableClass() {

    const navigate = useNavigate();
    const dataSource = [
        {
            stt: '1',
            id_class: '57Fbd',
            nameofClass: '10 Downing Street',
            totalStudent: '10',
            note: '',
            statusClass: 'Đã xác nhận'
        },
        {
            stt: '2',
            id_class: '6738',
            nameofClass: '10 Street',
            totalStudent: '10',
            note: '',
            statusClass: 'Đã xác nhận'
        },
        {
            stt: '3',
            id_class: '6Gh8',
            nameofClass: 'Halo Street',
            totalStudent: '10',
            note: '',
            statusClass: 'Đã xác nhận'
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Mã lớp',
            dataIndex: 'id_class',
            key: 'id_class',
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
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Trang thái',
            dataIndex: 'statusClass',
            key: 'statusClass',
            render: statusClass => (
                <span style={{ color: statusClass === 'Đã xác nhận' ? 'green' : 'red' }}>
                    {statusClass === 'Đã xác nhận' ? 'Đã xác nhận' : 'Chưa xác nhận'}
                </span>

            )
        },
       
    ];
    const handleRowClick = record => {
        navigate(`${record.id_class}`)

    };

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} onRow={record => ({
                onClick: () => handleRowClick(record),

            })}
                bordered />;
        </div>

    );

}
export default TableClass;