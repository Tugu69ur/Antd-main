import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface DeleteProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    user: { name: string } | null; // Adjust according to your user structure
}

const Delete: React.FC<DeleteProps> = ({ visible, onConfirm, onCancel, user }) => {
    return (
        <Modal
            title={
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'start',marginLeft:'5px' }}>
                    {/* Outer Circle */}
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#FEF3F2',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                        {/* Inner Circle */}
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#FEE4E2',
                            position: 'absolute',
                        }} />
                        {/* Trash Icon */}
                        <DeleteOutlined style={{ fontSize: '24px', color: '#D92D20', position: 'relative', zIndex: 1 }} />
                    </div>
                    <span style={{ fontSize: '25px', marginTop: '8px', color:'#101828' }}>Хүчингүй болгох</span>
                </span>
            }
            visible={visible}
            footer={null}
            onCancel={onCancel}
            style={{ width: '400px', borderRadius: '12px' }}
            bodyStyle={{ height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
            <p className='ml-1 text-[#475467] text-[18px]'>Та уг хүсэлтийг зөвшөөрч устгахдаа итгэлтэй байна уу?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={onCancel}
                    style={{
                        width: '200px',
                        height: '50px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                    }}
                >
                    Болих
                </Button>
                <Button
                    onClick={onConfirm}
                    style={{
                        width: '200px',
                        height: '50px',
                        borderRadius: '8px',
                        border: '1px solid #FF3B30',
                        backgroundColor: '#FF3B30',
                        color: '#ffffff',
                    }}
                >
                    Устгах
                </Button>
            </div>
        </Modal>
    );
};

export default Delete;
