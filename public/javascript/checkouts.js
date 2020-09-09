
Stripe.setPublishableKey('pk_test_51HP3AGKIW5JeEp10V7gHzxhZFUSGzLRFQf2twR998MPVH4nQsHcC4zADSqLAaIOTBO3o00YF7dm9JFmaDqgAl4tn000n2PsABo');

var $form = $('#forma');

$form.submit(function(event){
    
    $('#error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number : $('#creditnum').val(),
        cvc : $('#cvc').val(),
        exp_month : $('#expirationm').val(),
        exp_year : $('#expirationy').val(),
        name : $('#name').val()

    }, stripeResponseHandler)
    return false;
});

function stripeResponseHandler(status , response){
    if(response.error){
        $('#error').text(response.error.message);
        $('#error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    }
    else{
        var token = response.id;

        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        $form.get(0).submit();
    }

}