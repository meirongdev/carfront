import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'

interface ConfirmDialogProps {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
  title: string
  message: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position='absolute' top={0} right={0}>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography> {message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleClose} variant='contained'>
          Cancel
        </Button>
        <Button color='secondary' onClick={handleConfirm} variant='contained'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
