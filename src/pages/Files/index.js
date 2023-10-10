/* eslint-disable */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import AmxTextEditor from '../../components/AmxTextEditor';
import { useAmxControlService } from '../../hooks/amxControlService/lib/AmxControlServiceContext';
import eventBus from '../../lib/eventBus';

const FilesPage = () => {
  const amxControlService = useAmxControlService();
  const [editorValue, setEditoValue] = useState(
    'Click Button to Fetch the file',
  );
  const editoConfig = useMemo(() => {
    return {
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
    };
  });

  const getFile = useCallback(() => {
    amxControlService.getFile('/config');
  });

  const onChangeEditorValue = useCallback((value) => {
    setEditoValue(value);
  });

  useEffect(() => {
    eventBus.on('hcontrol.file', (data) => {
      setEditoValue(data);
    });
  }, []);

  return (
    <div className="row g-4 justify-content-center">
      <div className="col-md-3 col-sm-12 col-12">
        <Card className="h-100 border-0">
          <Card.Body className="text-center">
            <Button variant="primary" onClick={getFile}>
              Get configuration file
            </Button>
            <Card.Text className="mt-3 text-center">
              <strong>Note:</strong> File to be served is set in the netlinx
              file.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="col-md-9 col-sm-12 col-12">
        <AmxTextEditor
          value={editorValue}
          options={editoConfig}
          onChangeValue={(value) => onChangeEditorValue(value)}
        />
      </div>
    </div>
  );
};

export default FilesPage;
