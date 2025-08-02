import { useState } from "react";
import * as XLSX from 'xlsx';
import { Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function ImportExcel({ openImportExcel, closeImportExcel, onImportExcel }) {
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Get the first sheet
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(json);
            onImportExcel(json);
        };
        reader.readAsBinaryString(file);
    }
    const uploadProps = {
        accept: ".xlsx, .xls",
        beforeUpload: (file) => {
            handleFileUpload(file);
            return false;
        },
        maxCount: 1,
    }
return (
    <div>
        <Modal
            title="Nhập file excel"
            centered
            open={openImportExcel}
            onCancel={
                closeImportExcel}
            footer={null}
        >
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined/>}>Chọn file excel</Button>
            </Upload>
              {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
        </Modal>

    </div>
);
};


export default ImportExcel;