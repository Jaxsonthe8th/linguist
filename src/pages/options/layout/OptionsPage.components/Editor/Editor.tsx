import React, { FC, useContext, useEffect, useState } from 'react';
import { useImmutableCallback } from 'react-elegant-ui/esm/hooks/useImmutableCallback';
import { cn } from '@bem-react/classname';

import { LayoutFlow } from '../../../../../components/layouts/LayoutFlow/LayoutFlow';
import { ModalLayout } from '../../../../../components/layouts/ModalLayout/ModalLayout';
import { Button } from '../../../../../components/primitives/Button/Button.bundle/universal';
import {
	IModalProps,
	Modal,
} from '../../../../../components/primitives/Modal/Modal.bundle/desktop';
import { Textinput } from '../../../../../components/primitives/Textinput/Textinput.bundle/desktop';
import { getMessage } from '../../../../../lib/language';
import { OptionsModalsContext } from '../../OptionsPage';

import { MonacoEditor } from './MonakoEditor/MonacoEditor';

import './Editor.css';

export const cnEditor = cn('Editor');

export type EditorEntry = {
	readonly name: string;
	readonly code: string;
};

interface EditorProps extends Pick<IModalProps, 'onClose'> {
	/**
	 * When property is not `null`, will used values from object, otherwise empty values
	 */
	data: EditorEntry | null;
	/**
	 * Call when user save changes
	 * Provide new object with changes
	 */
	onSave: (value: EditorEntry) => void;
	error: null | string;
}

export const emptyEditorEntry: EditorEntry = {
	name: '',
	code: '',
};

export const Editor: FC<EditorProps> = ({
	data = emptyEditorEntry,
	onClose,
	onSave,
	error,
}) => {
	const scope = useContext(OptionsModalsContext);

	const [name, setName] = useState('');
	const [code, setCode] = useState('');

	// Local error are reset while update outer error
	const [localError, setLocalError] = useState<string | null>(null);
	useEffect(() => {
		setLocalError(null);
	}, [error]);

	// Init
	useEffect(() => {
		if (data === null) return;
		setName(data.name);
		setCode(data.code);
	}, [data]);

	const onSavePress = useImmutableCallback(() => {
		if (name.trim().length < 1) {
			setLocalError(getMessage('editorWindow_message_invalidName'));
			return;
		}

		onSave({
			name,
			code,
		});
	}, [code, name, onSave]);

	const actualError = localError || error;

	return (
		<Modal
			className={cnEditor({})}
			visible={true}
			onClose={onClose}
			scope={scope}
			preventBodyScroll
		>
			<div className={cnEditor('Container')}>
				<ModalLayout
					footer={[
						<Button key="save" view="action" onPress={onSavePress}>
							{getMessage('editorWindow_save')}
						</Button>,
						<Button key="close" onPress={onClose as any}>
							{getMessage('editorWindow_close')}
						</Button>,
					]}
				>
					<LayoutFlow direction="vertical" indent="l">
						<LayoutFlow direction="vertical" indent="m">
							<div>{getMessage('editorWindow_data_name')}</div>
							<Textinput value={name} onInputText={setName} />
						</LayoutFlow>

						<LayoutFlow direction="vertical" indent="m">
							<MonacoEditor value={code} setValue={setCode} />
						</LayoutFlow>

						{actualError && (
							<div className={cnEditor('Error')}>{actualError}</div>
						)}
					</LayoutFlow>
				</ModalLayout>
			</div>
		</Modal>
	);
};
