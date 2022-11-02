<?php

namespace App\Services\Client;

use App\Helpers\Helper;
use App\Http\Traits\ApiResponse;
use App\Repositories\Client\AuthClientRepositories;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthClientServices
{
    use ApiResponse;
    protected $authRepository;
    public function __construct(AuthClientRepositories $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function register($request): JsonResponse
    {
        $avatar = Helper::saveImgBase64($request->avatar, 'Customer');
        $dataRequest = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'point' => $request->point,
            'avatar' => $avatar,
            'status' => 1,
            'address' => $request->address,
            'created_date' => date('Y-m-d')
        ];
        $result = $this->authRepository->register($dataRequest);

        if ($result['status'] == 200) {
            return $this->apiResponse($result['data'], $result['status'], $result['message']);
        } else {

            return $this->apiResponse([], $result['status'], $result['message']);
        }
    }

    public function login($request)
    {
        $result = $this->authRepository->login($request);
        if ($result['status'] == 200) {
            return $this->apiResponse($result['token'], $result['status'], $result['message']);
        } else {
            return $this->apiResponse([], $result['status'], $result['message']);
        }
    }

    public function otpSendMailClient($request)
    {
        $result = $this->authRepository->otpSendMailClient($request);
        if ($result['status'] == 200) {
            return $this->apiResponse([], $result['status'], $result['message']);
        } else {
            return $this->apiResponse([], $result['status'],  $result['message']);
        }
    }
    public function forgotPasswordClient($request)
    {

        if (!empty($request->get('email')) && !empty($request->get('otp')) && !empty($request->get('password'))) {
            $dataRequest = [
                'email' => $request->get('email'),
                'password' => Hash::make($request->password),
                'otp' => $request->get('otp')
            ];
            $result = $this->authRepository->forgotPasswordClient($dataRequest);
        } else {
            $result = [
                'status' => 403,
                'message' => 'Field not found',
            ];
        }

        // dd($result);
        if ($result['status'] === 200) {
            return $this->apiResponse([], 'success', $result['message']);
        } else {
            return $this->apiResponse([], $result['status'], $result['message']);
        }
    }
}
