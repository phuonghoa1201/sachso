import { PlusOutlined, InsertRowAboveOutlined } from "@ant-design/icons";
import FilterQuestion from "./CrudQuestion/FilterQuestion";
import TableQuestion from "./TableQuestion/TableQuestion";
import { useState } from "react";
import AddQuestion from "./CrudQuestion/AddQuestion";
import ViewQuestion from "./CrudQuestion/ViewQuestions";
import { Modal } from "antd";
function ManageQuestion() {
    const [questions, setQuestions] = useState([
        {

            key: '1',
            stt: 1,
            class: 'Lớp 2',
            unit: 'Unit 1',
            skills: ['R'],
            questionText: 'Listen and choose the correct answer.',
            types: 'Fill Color',
            levels: 'Vận dụng',
            answersType: 'text',
            answers: [
                { value: "Answer A", isCorrect: false },
                { value: "Answer B", isCorrect: true },
                { value: "Answer C", isCorrect: false },
            ],
        }
    ]);

    // Open/ close add questions modal
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);

    // Update câu hổi
    const [editingQuestion, setEditingQuestion] = useState(null)
    // Dùng chung form với add

    // Open add question Modal
    const handleOpenAddQuestionModal = () => {
        // khi bấm nút thêm mới thì để edit null để báo đây là thêm
        setEditingQuestion(null);
        setOpenAddQuestionModal(true);

    }
    // Close add question Modal
    const handleCloseAddQuestionModal = () => {
        setOpenAddQuestionModal(false);
        // clear editingQuestion về null đi
        setEditingQuestion(null);
    };

    // Bấm nút sửa lên từng dòng từng question của bảng thì để cho 
    const handleOpenUpdateQuestionModal = (question) => {
        setEditingQuestion(question)
        setOpenAddQuestionModal(true);

    }

    const addQuestion = (newQuestion) => {
        setQuestions(prevQuestions => [
            ...prevQuestions,
            {
                ...newQuestion,
                key: (prevQuestions.length + 1).toString(),
                stt: prevQuestions.length + 1,
                skills: Array.isArray(newQuestion.skills) ? newQuestion.skills : [newQuestion.skills],
                unit: newQuestion.unit || newQuestion.units || '',
                answersType: newQuestion.answersType || "text",

            }
        ]);
        handleCloseAddQuestionModal();
    }

    // update: “Tìm đúng câu hỏi đang sửa, thay thế bằng dữ liệu mới, nhưng giữ nguyên key và stt. Sau đó reset trạng thái editing để modal biết là đã sửa xong.”
    const updateQuestion = (updatedQuestion) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.key === editingQuestion.key
                    ? { ...updatedQuestion, key: q.key, stt: q.stt, answersType: updatedQuestion.answersType || "text", } : q
            )
        )
        setEditingQuestion(null)
        setOpenAddQuestionModal(false);
    }

    // Lọc
    const [filterQuestions, setFilterQuestions] = useState(questions);

    const handleFilter = (filterValues) => {
        const filtered = questions.filter((q) => {
            return (
                (!filterValues.class || q.class === filterValues.class) &&
                (!filterValues.unit || filterValues.unit.includes(q.unit)) &&
                (!filterValues.skill ||
                    q.skills.some(s => s.toLowerCase().includes(filterValues.skill.toLowerCase()))
                ) &&
                (!filterValues.type || q.types === filterValues.type) &&
                (!filterValues.request || q.request === filterValues.request) &&
                (!filterValues.level ||  q.levels === filterValues.level) &&
                (!filterValues.question || q.question.toLowerCase().includes(filterValues.question.toLowerCase()))

            );
        })
        setFilterQuestions(filtered)
    }

    // view question
    // set state open Modal
    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewQuestions, setViewQuestions] = useState(null);

    const handleViewQuestions = (question) => {
        console.log("VIEW CLICKED:", question);
        setViewQuestions(question);
        setOpenViewModal(true);

    }
    //  delete Questions
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);

    const handleOpenDeleteModal = (question) => {
        setQuestionToDelete(question);
        setConfirmDeleteVisible(true);
    };


    return (
        <div>
            <div className="  mx-auto mt-4 bg-white">
                {/* Title */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-gray-300 px-4">
                    <div className="uppercase text-xl font-medium">
                        Quản lý câu hỏi
                    </div>
                    <div className="flex space-x-2 text-sm">
                        <button className="py-2 bg-blue-500 text-white border rounded border-blue-500 px-2" onClick={handleOpenAddQuestionModal}>
                            <PlusOutlined className="text-white" /> Thêm câu hỏi
                        </button>
                        <button className="border bg-blue-500 text-white rounded border-blue-500 px-2">
                            <InsertRowAboveOutlined /> Nhập từ excel
                        </button>
                    </div>
                </div>
                {/* Filter */}
                <FilterQuestion onFilter={handleFilter} />
                <TableQuestion questions={filterQuestions} onUpdate={handleOpenUpdateQuestionModal} onView={handleViewQuestions} onDelete={handleOpenDeleteModal} />
            </div>
            <AddQuestion openAddQuestion={openAddQuestionModal} closeAddQuestion={handleCloseAddQuestionModal} addQuestion={addQuestion} updateQuestion={updateQuestion} editingQuestion={editingQuestion} />
            <ViewQuestion openViewQuestion={!!viewQuestions} closeViewQuestion={() => setViewQuestions(null)} questionData={viewQuestions} />
            <Modal
                title="Xác nhận xoá"
                open={confirmDeleteVisible}
                onOk={() => {
                    setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
                    setConfirmDeleteVisible(false);
                }}
                onCancel={() => setConfirmDeleteVisible(false)}
                okText="Xoá"
                cancelText="Hủy"
                okType="danger"
            >
                <p>Bạn có chắc chắn muốn xoá question "<strong>{questionToDelete?.questionText}</strong>" không?</p>
            </Modal>
        </div>
    );

}
export default ManageQuestion;