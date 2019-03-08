class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def render_error
    render json: { errors: model.errors.full_messages.join(',') }, status: 418
  end
end
