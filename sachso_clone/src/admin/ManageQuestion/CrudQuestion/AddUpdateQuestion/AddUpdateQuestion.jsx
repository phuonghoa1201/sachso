import { Modal, Form, Input, Select, Upload, Button, Checkbox } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UnitGradeSelector from "./UnitGradeSelector";
import SkillSelector from "./SkillSelector";
import QuestionTypeSelector from "./QuestionTypeSelector";
import CognitionSelector from "./CognitionSelector";
import { addQuestionApi, editQuestionApi } from "../../../../util/api";

function AddQuestion({ openAddQuestion, closeAddQuestion, addQuestion, updateQuestion, editingQuestion }) {
    const [form] = Form.useForm();

    // state audio / image
    const [audioUrl, setAudioUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    // state câu hỏi
    const [questionType, setQuestionType] = useState("Multiple Choice");
    const [answersType, setAnswersType] = useState("text");
    const [answers, setAnswers] = useState([
        { value: "", isCorrect: null },
        { value: "", isCorrect: null },
        { value: "", isCorrect: null },
    ]);

    // state requirement từ dropdown (text)
    const [selectedRequirement, setSelectedRequirement] = useState("");



    useEffect(() => {
        if (editingQuestion) {
            form.setFieldsValue(editingQuestion);
            setAnswersType(editingQuestion.answerType || "text");
            setAnswers(editingQuestion.answers || []);
            setQuestionType(editingQuestion.questionType || "Multiple Choice");
            setAudioUrl(editingQuestion.audioUrl || "");
            setImgUrl(editingQuestion.imageUrl || "");
            setSelectedRequirement(editingQuestion.requirement || "");
        } else {
            form.resetFields();
            setAnswersType("text");
            setAnswers([
                { value: "", isCorrect: null },
                { value: "", isCorrect: null },
                { value: "", isCorrect: null },
            ]);
            setQuestionType("Multiple Choice");
            setAudioUrl("");
            setImgUrl("");
            setSelectedRequirement("");
        }
    }, [editingQuestion, form]);

    const onFinish = async (values) => {
        const updatedData = {};

        if (values.gradeId) updatedData.gradeId = values.gradeId;
        if (values.unitId) updatedData.unitId = values.unitId;
        if (values.skillId) updatedData.skillId = values.skillId;
        if (values.questionTypeId) updatedData.questionTypeId = values.questionTypeId;
        if (values.cognitionLevelId) updatedData.cognitionLevelId = values.cognitionLevelId;
        if (selectedRequirement) updatedData.requirement = selectedRequirement;
        if (audioUrl) updatedData.audioUrl = audioUrl;
        if (imgUrl) updatedData.imageUrl = imgUrl;
        if (values.readingContent) updatedData.readingText = values.readingContent;
        if (values.content) updatedData.content = values.content;
        if (answersType) updatedData.answerType = answersType;
        if (answers && answers.length > 0) updatedData.answers = answers;

        try {
            if (editingQuestion) {
                const res = await editQuestionApi(editingQuestion._id, updatedData);
                if (res.EC === 0) {
                    alert("Chỉnh sửa câu hỏi thành công!");
                    updateQuestion({ ...editingQuestion, ...updatedData });
                    closeAddQuestion();
                } else {
                    alert("Sửa câu hỏi thất bại: " + (res.error || ""));
                }
            } else {
                const res = await addQuestionApi(

                    updatedData.gradeId,
                    updatedData.unitId,
                    updatedData.skillId,
                    updatedData.questionTypeId,
                    updatedData.cognitionLevelId,
                    updatedData.requirement,
                    updatedData.audioUrl,
                    updatedData.imageUrl,
                    updatedData.readingText,
                    updatedData.content,
                    updatedData.answerType,
                    updatedData.answers
                );
                console.log("Dữ liệu gửi lên:", updatedData);
                console.log("Kết quả trả về từ API:", res);

                if (res.EC === 0) {
                    alert("Thêm câu hỏi thành công!");
                    // dùng data được trả về từ backend
                    const newQuestion = res.DT || updatedData;
                    //  cập nhật state ngay lập tức
                    addQuestion(newQuestion);
                    form.resetFields();
                    setAnswers([
                        { value: "", isCorrect: null },
                        { value: "", isCorrect: null },
                        { value: "", isCorrect: null },
                    ]);
                    setAudioUrl("");
                    setImgUrl("");
                    setSelectedRequirement("");
                    closeAddQuestion();
                } else {
                    alert("Thêm câu hỏi thất bại: " + (res.data.error || ""));
                }
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Đã xảy ra lỗi khi thêm/cập nhật câu hỏi");
        }
    };

    // handle file upload / paste link
    const handleAudioFileUpload = (file) => {
        setAudioUrl(URL.createObjectURL(file));
        return false;
    };
    const handlePasteLinkAudio = (e) => setAudioUrl(e.target.value.trim());
    const handleImgFileUpload = (file) => {
        setImgUrl(URL.createObjectURL(file));
        return false;
    };
    const handlePasteImgLink = (e) => setImgUrl(e.target.value.trim());

    const onAnswerChange = (index, val) => {
        const newAnswers = [...answers];
        newAnswers[index].value = val;
        setAnswers(newAnswers);
    };
    const toggleCorrect = (index, isTrue) => {
        const newAnswers = [...answers];
        newAnswers[index].isCorrect = isTrue;
        setAnswers(newAnswers);
    };
    const addAnswers = () => setAnswers([...answers, { value: "", isCorrect: null }]);

    return (
        <Modal
            title={editingQuestion ? "CẬP NHẬT CÂU HỎI" : "THÊM CÂU HỎI"}
            centered
            open={openAddQuestion}
            onCancel={closeAddQuestion}
            width="80%"
            footer={null}
        >
            <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-4">
                <div className="max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 space-y-4">
                        <UnitGradeSelector form={form} />
                        <SkillSelector />
                        <QuestionTypeSelector />

                        <Form.Item
                            label={<span className="rounded-t-lg bg-blue-500 uppercase text-white py-2 px-2">Yêu cầu đề bài</span>}
                        >
                            <Select
                                placeholder="Chọn yêu cầu"
                                name="requirement"
                                value={selectedRequirement}
                                onChange={setSelectedRequirement}
                                options={[
                                    { value: "Listen, read and tick the correct answer.", label: "Listen, read and tick the correct answer." },
                                    { value: "Look at the picture and write the missing word.", label: "Look at the picture and write the missing word." },
                                ]}
                            />
                        </Form.Item>

                        <CognitionSelector />
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <Form.Item label="Link audio" name="audioUrl">
                            <div className="flex flex-row">
                                <Input placeholder="https://..." value={audioUrl} onChange={handlePasteLinkAudio} />
                                <Upload beforeUpload={handleAudioFileUpload} showUploadList={false} accept="audio/*">
                                    <Button icon={<UploadOutlined />}>Audio Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {audioUrl && <audio controls style={{ marginTop: 8, width: "100%" }} src={audioUrl} />}

                        <Form.Item label="Link hình ảnh" name="imageUrl">
                            <div className="flex flex-row">
                                <Input placeholder="https://..." value={imgUrl} onChange={handlePasteImgLink} />
                                <Upload beforeUpload={handleImgFileUpload} showUploadList={false} accept="image/*">
                                    <Button icon={<UploadOutlined />}>Image Upload</Button>
                                </Upload>
                            </div>
                        </Form.Item>

                        {imgUrl && <img src={imgUrl} alt="Hình ảnh preview" className="block mx-auto mt-2 w-1/3 h-auto max-h-1/3" />}

                        <Form.Item name="readingContent" label="Nội dung bài đọc (nếu có)">
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        {questionType === "Multiple Choice" && (
                            <>
                                <div className="p-4 border border-gray-200  shadow-sm bg-white">
                                    <h3 className="border-b border-gray-300 w-full py-2">Câu 1</h3>
                                    <Form.Item label="Loại đáp án là " className="my-2">
                                        <Select value={answersType} onChange={(val) => {
                                            console.log('User chọn answersType:', val);
                                            setAnswersType(val);
                                            // reset after change form
                                            setAnswers([
                                                { value: "" },
                                                { value: "" },
                                                { value: "" },
                                            ])
                                        }}>
                                            <Select.Option value="text">Chữ cái</Select.Option>
                                            <Select.Option value="image">Hình ảnh</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhập nội dung câu hỏi"
                                        name="content"
                                        className="my-2"

                                    >
                                        <Input.TextArea placeholder="..." rows={1} disabled={selectedRequirement === 'Look at the picture and write the missing word.'} />
                                    </Form.Item>

                                    <div className="flex justify-between">
                                        <label>Các đáp án</label>
                                        <label>Đúng/Sai</label>
                                    </div>

                                    {answers.map((ans, index) => (

                                        <Form.Item
                                            key={index}
                                            required
                                            rules={[{ required: true, message: `Vui lòng nhập đáp án ${String.fromCharCode(65 + index)}` }]}
                                        >
                                            <div className="grid grid-cols-[9fr_1fr] items-center gap-4">
                                                {/* Cột 1: chữ cái A, B, C */}
                                                {answersType === 'text' ? (
                                                    <Input
                                                        addonBefore={String.fromCharCode(65 + index) + '.'}
                                                        value={ans.value}
                                                        onChange={(e) => onAnswerChange(index, e.target.value)}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <Input
                                                            addonBefore={String.fromCharCode(65 + index) + '.'}
                                                            value={ans.value}
                                                            onChange={(e) => onAnswerChange(index, e.target.value)}
                                                            className="w-full"
                                                        />
                                                        {ans.value && (
                                                            <img

                                                                src={ans.value}
                                                                alt={`Đáp án ${String.fromCharCode(65 + index)}`}
                                                                className="w-28 h-28 object-contain border border-gray-300 rounded"
                                                            />
                                                        )}
                                                    </div>
                                                )}


                                                {/* Cột 3: Checkbox đúng/sai */}
                                                <div className="flex gap-6 justify-center">
                                                    <Checkbox
                                                        checked={ans.isCorrect === true}
                                                        onChange={() => toggleCorrect(index, true)}
                                                    >
                                                    </Checkbox>
                                                    <Button shape="circle"
                                                        type={ans.isCorrect === false ? "danger" : "default"}
                                                        onClick={() => toggleCorrect(index, false)}
                                                        style={{
                                                            borderColor: ans.isCorrect === false ? '#ff4d4f' : undefined
                                                        }}

                                                    >
                                                        <MinusCircleOutlined style={{ color: 'red' }} />
                                                    </Button>
                                                </div>

                                            </div>

                                        </Form.Item>
                                    ))}
                                    <Button type="dashed" onClick={addAnswers} size="small">
                                        <PlusCircleOutlined /> Thêm đáp án
                                    </Button>
                                </div>

                            </>
                        )}
                        <div className="flex justify-end gap-4 mt-4">
                            <Button onClick={closeAddQuestion}>Đóng</Button>
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>

        </Modal >


    );
}
export default AddQuestion;