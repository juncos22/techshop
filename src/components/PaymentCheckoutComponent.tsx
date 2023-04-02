import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, Container, CircularProgress, SelectChangeEvent, Alert } from '@mui/material';
import { useProductStore } from '@/store/products';
import { useCartStore } from '@/store/productCart';

const steps = ['Confirm or Add Payment Method', 'Confirm Checkout'];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f9f9f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type PaymenCheckoutProps = {
    username: string
    paymentMethod: string
    onSelectPayment?: (e: SelectChangeEvent<string>) => void
}

function PaymentMethod({ username, onSelectPayment, paymentMethod }: PaymenCheckoutProps) {
    const productStore = useProductStore()
    React.useEffect(() => {
        productStore.getPaymentMethods(username)
    }, [username])

    return (
        <React.Fragment>
            <FormControl fullWidth>
                {
                    productStore.loading ? (
                        <Container sx={{ m: 'auto', textAlign: 'center' }}>
                            <CircularProgress size={30} />
                        </Container>
                    ) :
                        (
                            <>
                                <InputLabel id="demo-simple-select-label" sx={{ color: 'black' }}>Select Payment Method</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Payment Method"
                                    name='paymentMethod'
                                    value={paymentMethod}
                                    required
                                    onChange={onSelectPayment}
                                >
                                    {
                                        productStore.paymentMethods.map((pm, i) => (
                                            <MenuItem value={pm.id!} key={i}>
                                                {pm.cardNumber}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </>
                        )
                }
            </FormControl>
        </React.Fragment>
    )
}
function PaymentDetails({ username }: PaymenCheckoutProps) {
    const cartStore = useCartStore()

    return (
        <React.Fragment>
            {
                cartStore.cart.productCarts.map((pc, i) => (
                    <Typography key={i} sx={{ color: 'black' }} variant='h6'>{pc.product.name} - ${pc.subtotal}</Typography>
                ))
            }
            {
                <Typography variant='h6' sx={{ color: 'black' }}>Total: ${cartStore.cart.total}</Typography>
            }
        </React.Fragment>
    )
}



export default function PaymentCheckout({ username }: PaymenCheckoutProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState("")
    const cartStore = useCartStore()
    const onSelectPaymentMethod = (e: SelectChangeEvent<string>) => {
        setPaymentMethod(e.target.value)
    }

    const fragments = [
        <PaymentMethod paymentMethod={paymentMethod}
            onSelectPayment={onSelectPaymentMethod}
            username={username} />,
        <PaymentDetails
            paymentMethod={paymentMethod}
            username={username} />
    ]

    const finishCheckOut = async () => {
        // console.log(cartStore.cart);
        cartStore.makePurchase(cartStore.cart)
    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Box sx={style}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, i) => {
                    return (
                        <Step key={i}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, color: 'black' }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {
                        fragments[activeStep]
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="primary"
                            disabled={activeStep === 0 || cartStore.loading}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {
                            cartStore.error && <Alert color='error'>{cartStore.error}</Alert>
                        }
                        {
                            cartStore.loading ? (
                                <CircularProgress size={30} color='info' />
                            ) : (
                                <Button onClick={activeStep === steps.length - 1 ? finishCheckOut : handleNext} disabled={!paymentMethod}>
                                    {activeStep === steps.length - 1 ? 'Finish Checkout' : 'Next'}
                                </Button>
                            )
                        }
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}