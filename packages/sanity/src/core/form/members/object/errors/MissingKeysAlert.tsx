import {Stack, Text} from '@sanity/ui'
import {randomKey} from '@sanity/util/content'
import {useCallback} from 'react'

import {Button} from '../../../../../ui-components'
import {isDev} from '../../../../environment'
import {Translate, useTranslation} from '../../../../i18n'
import {Alert} from '../../../components/Alert'
import {Details} from '../../../components/Details'
import {FormField} from '../../../components/formField'
import {PatchEvent, setIfMissing} from '../../../patch'
import {type MissingKeysError} from '../../../store/types/memberErrors'

interface Props {
  error: MissingKeysError
  onChange: (patchEvent: PatchEvent) => void
}

export function MissingKeysAlert(props: Props) {
  const {error, onChange} = props
  const handleFixMissingKeys = useCallback(() => {
    onChange(
      PatchEvent.from((error.value || []).map((val, i) => setIfMissing(randomKey(), [i, '_key']))),
    )
  }, [error.value, onChange])

  const {t} = useTranslation()

  return (
    <FormField title={error.schemaType.title} description={error.schemaType.description}>
      <Alert
        status="warning"
        suffix={
          <Stack padding={2}>
            <Button
              onClick={handleFixMissingKeys}
              text={t('form.error.missing-keys-alert.add-button.text')}
              tone="caution"
            />
          </Stack>
        }
        title={t('form.error.missing-keys-alert.title')}
      >
        <Text as="p" muted size={1}>
          {t('form.error.missing-keys-alert.summary')}
        </Text>

        <Details
          marginTop={4}
          open={isDev}
          title={t('form.error.missing-keys-alert.details.title')}
        >
          <Stack space={3}>
            <Text as="p" muted size={1}>
              <Translate t={t} i18nKey="form.error.missing-keys-alert.details.description" />
            </Text>

            <Text as="p" muted size={1}>
              <Translate
                t={t}
                i18nKey="form.error.missing-keys-alert.details.additional-description"
              />
            </Text>
          </Stack>
        </Details>
        {/* TODO: render array items and highlight the items with missing key */}
      </Alert>
    </FormField>
  )
}
