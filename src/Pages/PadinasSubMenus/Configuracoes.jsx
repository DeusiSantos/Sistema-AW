import React, { useState, useContext } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Image, Upload, Button, message, Divider, notification } from 'antd';

import { AuthContext } from "../../Contexts/AuthProvider";
import { FaPhone, FaLock, FaUser, FaEnvelope } from 'react-icons/fa';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const Configuracoes = () => {
    const { name, phone, email, username } = useContext(AuthContext);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [telefone, setTelefone] = useState('')

    const [tempImages, setTempImages] = useState([]);

    const HandlePassword = () => {
        if (password != confirmPassword) {
            notification.error({
                message: 'Erro',
                description: 'Senhas diferentes',
            });
        } else if (password == "" || confirmPassword == "" || telefone == "") {
            notification.error({
                message: 'Erro',
                description: 'Existe campos vazios',
            });
        } else {
            notification.success({
                message: 'Sucesso',
                description: 'Senha Alterada com Sucesso',
            });
        }
    }

    const naoMuda = () =>{
        notification.info({
            message: 'Informação',
            description: 'Dados reservado do sistema! impossivel Alterar ',
        });
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setTempImages(newFileList);
        setFileList(newFileList);
    };

    const handleRemove = () => {
        if (fileList.length == "") {
            notification.error({
                message: 'Erro ao apagar',
                description: 'Por favor Selecione uma foto.',
            });
        } else {
            setFileList([]);
            setPreviewImage('https://via.placeholder.com/150');
            // Update the user's avatar in the context and local storage
            const updatedUser = { name, phone, email, avatar: null };
            setUser(updatedUser);
            setUserLocalStorage(updatedUser);
            notification.success({
                message: 'Sucesso',
                description: 'Foto removida com sucesso.',
            });
        }
    };

    const handleSave = () => {
        // Aqui você pode enviar as imagens carregadas (tempImages)
        tempImages.forEach(async (file) => {
            if (file.status === 'done' || file.originFileObj) {
                const imageUrl = await getBase64(file.originFileObj || file);
                const updatedUser = { name, phone, email, avatar: imageUrl };
                setUser(updatedUser);
                setUserLocalStorage(updatedUser);
            }
        });
        notification.success({
            message: 'Sucesso',
            description: 'Foto atualizada com sucesso.',
        });
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Clique para atualizar a foto</div>
        </div>
    );

    return (
        <div className="Home block-lg:p-0 p-2 float-right lg:float-none lg:flex flex-col m-auto lg:top-0 right-0 bottom-0">
            <div className="flex w-full lg:h-[500px] flex-col lg:flex-row mt-5 gap-6 justify-between">
                <div className="float-left shadow w-full h-full">
                    <h2 className='w-ful top text-base rounded flex items-center gap-2 text-[#000]'><span className=' bg-white gap-2 p-2 flex justify-center items-center' ><FaUser /> Alterar Informações</span></h2>
                    <form className=' p-4'>
                        <div className="row mb-3">
                            <div className="col-lg">
                                <label htmlFor="operador" className="form-label">Operador</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaUser /></span>
                                    <input type="text" className="form-control" id="operador" onClick={naoMuda} value={name} readOnly />
                                </div>
                            </div>
                            <div className="col-lg">
                                <label htmlFor="operador" className="form-label">Nome de Usuario</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaUser /></span>
                                    <input type="text" className="form-control" id="operador" onClick={naoMuda}  value={username} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg">
                                <label htmlFor="operador" className="form-label">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaEnvelope /></span>
                                    <input type="text" className="form-control" id="operador" onClick={naoMuda} value={email} readOnly />
                                </div>
                            </div>
                            <div className="col-lg">
                                <label htmlFor="operador" className="form-label">Telefone</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaPhone /></span>
                                    <input type="number" className="form-control" id="operador" onChange={(e)=> setTelefone(e.target.value)} placeholder={phone} value={telefone} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaLock /></span>
                                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Digite a nova senha" />
                                </div>
                            </div>
                            <div className="col-lg">
                                <label htmlFor="confirmPassword" className="form-label">Confirme</label>
                                <div className="input-group">
                                    <span className="input-group-text"><FaLock /></span>
                                    <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id="confirmPassword" placeholder="Confirme a senha" />
                                </div>
                            </div>

                        </div>

                        <div className=' mt-4'>
                        <Button type="primary" onClick={HandlePassword} style={{height: "50px" }}>
                            Salvar Alterações
                        </Button>
                        </div>
                    </form>
                </div>
                <div className=" p-4 w-full lg:w-[40%] h-full shadow">
                    <div className="flex gap-2 items-center p-3">
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            onRemove={handleRemove}
                            showUploadList={{
                                showPreviewIcon: true,
                                showRemoveIcon: true,
                            }}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <div>
                            <p>Altere A Foto De Perfil</p>
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className=' mt-4 flex flex-col gap-3'>
                        <Divider />
                        <Button type="primary" onClick={handleSave} style={{ height: "50px" }}>
                            Salvar
                        </Button>
                        <Button icon={<DeleteOutlined />} onClick={handleRemove} style={{ height: "50px" }}>
                            Remover Foto
                        </Button>
                    </div>
                </div>
            </div>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default Configuracoes;
